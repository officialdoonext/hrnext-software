import { query } from './db'
import { cookies } from 'next/headers'

export interface QueryResult<T = any> {
  data: any
  error: any | null
  count?: number | null
}

export class ServerNeonQueryBuilder<T = any> implements PromiseLike<QueryResult<T>> {
  private tableName: string
  private selectCols: string = '*'
  private isCount: boolean = false
  private isHead: boolean = false
  private isSingle: boolean = false
  private filters: Array<{ col: string; op: string; val: any }> = []
  private orderCol?: string
  private orderAsc: boolean = true
  private limitCount?: number
  private mutationType?: 'insert' | 'update' | 'delete' | 'upsert'
  private mutationData?: any
  private onConflict?: string

  constructor(tableName: string) {
    this.tableName = tableName
  }

  select(columns: string = '*', options?: { count?: 'exact' | 'planned' | 'estimated'; head?: boolean }) {
    this.selectCols = columns
    if (options?.count) {
      this.isCount = true
    }
    if (options?.head) {
      this.isHead = true
    }
    return this
  }

  eq(column: string, value: any) {
    this.filters.push({ col: column, op: '=', val: value })
    return this
  }

  neq(column: string, value: any) {
    this.filters.push({ col: column, op: '!=', val: value })
    return this
  }

  gt(column: string, value: any) {
    this.filters.push({ col: column, op: '>', val: value })
    return this
  }

  gte(column: string, value: any) {
    this.filters.push({ col: column, op: '>=', val: value })
    return this
  }

  lt(column: string, value: any) {
    this.filters.push({ col: column, op: '<', val: value })
    return this
  }

  lte(column: string, value: any) {
    this.filters.push({ col: column, op: '<=', val: value })
    return this
  }

  in(column: string, values: any[]) {
    this.filters.push({ col: column, op: 'IN', val: values })
    return this
  }

  not(column: string, operator: string, value: any) {
    if (value === null) {
      this.filters.push({ col: column, op: 'IS NOT NULL', val: null })
    }
    return this
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orderCol = column
    this.orderAsc = options?.ascending ?? true
    return this
  }

  limit(count: number) {
    this.limitCount = count
    return this
  }

  single() {
    this.isSingle = true
    return this
  }

  maybeSingle() {
    this.isSingle = true
    return this
  }

  insert(data: any) {
    this.mutationType = 'insert'
    this.mutationData = data
    return this
  }

  upsert(data: any, options?: any) {
    this.mutationType = 'upsert'
    this.mutationData = data
    this.onConflict = options?.onConflict
    return this
  }

  update(data: any) {
    this.mutationType = 'update'
    this.mutationData = data
    return this
  }

  delete() {
    this.mutationType = 'delete'
    return this
  }

  async execute(): Promise<QueryResult<T>> {
    try {
      const sanitizedTable = this.tableName.replace(/[^a-zA-Z0-9_]/g, '')
      const whereParts: string[] = []
      const params: any[] = []

      this.filters.forEach((f) => {
        const sanitizedCol = f.col.replace(/[^a-zA-Z0-9_]/g, '')
        if (!sanitizedCol) return

        if (f.op === 'IS NOT NULL') {
          whereParts.push(`"${sanitizedCol}" IS NOT NULL`)
        } else if (f.op === 'IN' && Array.isArray(f.val)) {
          if (f.val.length === 0) {
            whereParts.push('1 = 0')
          } else {
            const placeholders = f.val
              .map((item: any) => {
                params.push(item)
                return `$${params.length}`
              })
              .join(', ')
            whereParts.push(`"${sanitizedCol}" IN (${placeholders})`)
          }
        } else {
          params.push(f.val)
          whereParts.push(`"${sanitizedCol}" ${f.op} $${params.length}`)
        }
      })

      const whereSql = whereParts.length > 0 ? ` WHERE ${whereParts.join(' AND ')}` : ''
      const orderSql = this.orderCol ? ` ORDER BY "${this.orderCol.replace(/[^a-zA-Z0-9_]/g, '')}" ${this.orderAsc ? 'ASC' : 'DESC'}` : ''
      const limitSql = this.limitCount ? ` LIMIT ${this.limitCount}` : ''

      if (this.mutationType === 'insert' || this.mutationType === 'upsert') {
        const rows = Array.isArray(this.mutationData) ? this.mutationData : [this.mutationData]
        if (rows.length === 0 || !rows[0]) {
          return { data: this.isSingle ? null : [], count: 0, error: null }
        }

        const insertedRows: any[] = []
        for (const row of rows) {
          const keys = Object.keys(row).filter((k) => row[k] !== undefined)
          const rowParams = keys.map((k) => row[k])
          const cols = keys.map((k) => `"${k.replace(/[^a-zA-Z0-9_]/g, '')}"`).join(', ')
          const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ')

          let sql = `INSERT INTO "${sanitizedTable}" (${cols}) VALUES (${placeholders})`
          if (this.mutationType === 'upsert' && this.onConflict) {
            const conflictCols = this.onConflict
              .split(',')
              .map((c: string) => `"${c.trim().replace(/[^a-zA-Z0-9_]/g, '')}"`)
              .join(', ')
            const conflictColNames = this.onConflict.split(',').map((c: string) => c.trim())
            const updateSets = keys
              .filter((k) => !conflictColNames.includes(k))
              .map((k) => `"${k.replace(/[^a-zA-Z0-9_]/g, '')}" = EXCLUDED."${k.replace(/[^a-zA-Z0-9_]/g, '')}"`)
              .join(', ')
            if (updateSets) {
              sql += ` ON CONFLICT (${conflictCols}) DO UPDATE SET ${updateSets}`
            } else {
              sql += ` ON CONFLICT (${conflictCols}) DO NOTHING`
            }
          }
          sql += ` RETURNING *;`

          const res = await query(sql, rowParams)
          if (res.rows.length > 0) {
            insertedRows.push(res.rows[0])
          }
        }

        return {
          data: this.isSingle ? insertedRows[0] ?? null : insertedRows,
          count: insertedRows.length,
          error: null,
        }
      }

      if (this.mutationType === 'update') {
        const keys = Object.keys(this.mutationData || {}).filter((k) => this.mutationData[k] !== undefined)
        if (keys.length === 0) {
          return { data: this.isSingle ? null : [], count: 0, error: null }
        }

        const setParts = keys.map((k) => {
          params.push(this.mutationData[k])
          return `"${k.replace(/[^a-zA-Z0-9_]/g, '')}" = $${params.length}`
        })

        const sql = `UPDATE "${sanitizedTable}" SET ${setParts.join(', ')}${whereSql} RETURNING *;`
        const res = await query(sql, params)
        return {
          data: this.isSingle ? res.rows[0] ?? null : res.rows,
          count: res.rowCount,
          error: null,
        }
      }

      if (this.mutationType === 'delete') {
        const sql = `DELETE FROM "${sanitizedTable}"${whereSql} RETURNING *;`
        const res = await query(sql, params)
        return {
          data: this.isSingle ? res.rows[0] ?? null : res.rows,
          count: res.rowCount,
          error: null,
        }
      }

      // SELECT
      if (this.isCount && this.isHead) {
        const countRes = await query(`SELECT COUNT(*) as count FROM "${sanitizedTable}"${whereSql};`, params)
        const countVal = parseInt(countRes.rows[0]?.count, 10) || 0
        return { data: null, count: countVal, error: null }
      }

      let selectSql = ''
      if (sanitizedTable === 'employees' && (this.selectCols.includes('departments') || this.selectCols.includes('designations'))) {
        selectSql = `
          SELECT 
            e.*,
            CASE WHEN d.id IS NOT NULL THEN json_build_object('name', d.name) ELSE NULL END as departments,
            CASE WHEN des.id IS NOT NULL THEN json_build_object('name', des.name) ELSE NULL END as designations,
            CASE WHEN b.id IS NOT NULL THEN json_build_object('name', b.name) ELSE NULL END as branches,
            CASE WHEN rm.id IS NOT NULL THEN json_build_object('first_name', rm.first_name, 'last_name', rm.last_name) ELSE NULL END as reporting_manager
          FROM employees e
          LEFT JOIN departments d ON e.department_id = d.id
          LEFT JOIN designations des ON e.designation_id = des.id
          LEFT JOIN branches b ON e.branch_id = b.id
          LEFT JOIN employees rm ON e.reporting_manager_id = rm.id
          ${whereParts.length > 0 ? ` WHERE ${whereParts.map(p => p.replace(/\"([a-z_]+)\"/g, 'e."$1"')).join(' AND ')}` : ''}
          ${this.orderCol ? ` ORDER BY e."${this.orderCol.replace(/[^a-zA-Z0-9_]/g, '')}" ${this.orderAsc ? 'ASC' : 'DESC'}` : ''}
          ${limitSql};
        `
      } else if (sanitizedTable === 'leave_applications' && (this.selectCols.includes('employees') || this.selectCols.includes('leave_types'))) {
        selectSql = `
          SELECT 
            la.*,
            CASE WHEN e.id IS NOT NULL THEN json_build_object('first_name', e.first_name, 'last_name', e.last_name, 'photo_url', e.photo_url) ELSE NULL END as employees,
            CASE WHEN lt.id IS NOT NULL THEN json_build_object('name', lt.name) ELSE NULL END as leave_types
          FROM leave_applications la
          LEFT JOIN employees e ON la.employee_id = e.id
          LEFT JOIN leave_types lt ON la.leave_type_id = lt.id
          ${whereParts.length > 0 ? ` WHERE ${whereParts.map(p => p.replace(/\"([a-z_]+)\"/g, 'la."$1"')).join(' AND ')}` : ''}
          ${this.orderCol ? ` ORDER BY la."${this.orderCol.replace(/[^a-zA-Z0-9_]/g, '')}" ${this.orderAsc ? 'ASC' : 'DESC'}` : ''}
          ${limitSql};
        `
      } else {
        const safeCols =
          this.selectCols === '*' || this.selectCols.includes('(') || this.selectCols.includes('!')
            ? '*'
            : this.selectCols
                .split(',')
                .map((c: string) => `"${c.trim().replace(/[^a-zA-Z0-9_]/g, '')}"`)
                .join(', ')

        selectSql = `SELECT ${safeCols} FROM "${sanitizedTable}"${whereSql}${orderSql}${limitSql};`
      }

      const res = await query(selectSql, params)

      if (this.isSingle) {
        return { data: res.rows[0] ?? null, error: null }
      }

      return { data: res.rows, count: res.rowCount, error: null }
    } catch (err: any) {
      console.error(`[Neon Server Query Error on ${this.tableName}]:`, err?.message)
      if (this.isSingle) {
        return { data: null, error: err?.message || null }
      }
      return { data: [], count: 0, error: err?.message || null }
    }
  }

  then<TResult1 = QueryResult<T>, TResult2 = never>(
    onfulfilled?: ((value: QueryResult<T>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected)
  }
}

export async function createClient() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('hrms_session')?.value || cookieStore.get('demo_user_session')?.value
  let sessionUser: any = null

  if (sessionCookie) {
    try {
      const parsed = JSON.parse(sessionCookie)
      sessionUser = {
        id: parsed.id || '00000000-0000-0000-0000-000000000002',
        email: parsed.email || 'superadmin@peoplecore.io',
        user_metadata: {
          full_name: parsed.full_name || 'Super Admin',
        },
      }
    } catch {}
  }

  return {
    from: <T = any>(tableName: string) => new ServerNeonQueryBuilder<T>(tableName),
    auth: {
      getUser: async () => ({
        data: {
          user: sessionUser || { id: '00000000-0000-0000-0000-000000000002', email: 'superadmin@peoplecore.io' },
        },
        error: null,
      }),
    },
  }
}

export async function createAdminClient() {
  return createClient()
}

export default createClient
