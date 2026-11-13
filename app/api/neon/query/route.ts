import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/neon/db'

export async function POST(req: NextRequest) {
  let isSingle = false
  try {
    const body = await req.json()
    isSingle = Boolean(body?.isSingle)
    const {
      tableName,
      operation = 'select',
      data,
      selectCols = '*',
      filters = [],
      orderCol,
      orderAsc = true,
      limitCount,
      isCount = false,
      isHead = false,
      onConflict,
    } = body

    if (!tableName || typeof tableName !== 'string') {
      return NextResponse.json({ data: isSingle ? null : [], error: 'Invalid tableName' }, { status: 400 })
    }

    // Sanitize table name to prevent SQL injection
    const sanitizedTable = tableName.replace(/[^a-zA-Z0-9_]/g, '')
    if (!sanitizedTable) {
      return NextResponse.json({ data: isSingle ? null : [], error: 'Invalid tableName' }, { status: 400 })
    }

    // Build WHERE clause
    const whereParts: string[] = []
    const params: any[] = []

    if (Array.isArray(filters)) {
      filters.forEach((f: { col: string; op: string; val: any }) => {
        if (!f.col) return
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
    }

    const whereSql = whereParts.length > 0 ? ` WHERE ${whereParts.join(' AND ')}` : ''
    const orderSql = orderCol ? ` ORDER BY "${orderCol.replace(/[^a-zA-Z0-9_]/g, '')}" ${orderAsc ? 'ASC' : 'DESC'}` : ''
    const limitSql = limitCount ? ` LIMIT ${parseInt(String(limitCount), 10)}` : ''

    if (operation === 'insert' || operation === 'upsert') {
      const rows = Array.isArray(data) ? data : [data]
      if (rows.length === 0 || !rows[0]) {
        return NextResponse.json({ data: isSingle ? null : [], count: 0, error: null })
      }

      const insertedRows: any[] = []
      for (const row of rows) {
        const keys = Object.keys(row).filter((k) => row[k] !== undefined)
        const rowParams = keys.map((k) => row[k])
        const cols = keys.map((k) => `"${k.replace(/[^a-zA-Z0-9_]/g, '')}"`).join(', ')
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ')

        let sql = `INSERT INTO "${sanitizedTable}" (${cols}) VALUES (${placeholders})`
        if (operation === 'upsert' && onConflict && typeof onConflict === 'string') {
          const conflictCols = onConflict
            .split(',')
            .map((c: string) => `"${c.trim().replace(/[^a-zA-Z0-9_]/g, '')}"`)
            .join(', ')
          const conflictColNames = onConflict.split(',').map((c: string) => c.trim())
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

      return NextResponse.json({
        data: isSingle ? insertedRows[0] ?? null : insertedRows,
        count: insertedRows.length,
        error: null,
      })
    }

    if (operation === 'update') {
      const keys = Object.keys(data || {}).filter((k) => data[k] !== undefined)
      if (keys.length === 0) {
        return NextResponse.json({ data: isSingle ? null : [], count: 0, error: null })
      }

      const setParts = keys.map((k) => {
        params.push(data[k])
        return `"${k.replace(/[^a-zA-Z0-9_]/g, '')}" = $${params.length}`
      })

      const sql = `UPDATE "${sanitizedTable}" SET ${setParts.join(', ')}${whereSql} RETURNING *;`
      const res = await query(sql, params)
      return NextResponse.json({
        data: isSingle ? res.rows[0] ?? null : res.rows,
        count: res.rowCount,
        error: null,
      })
    }

    if (operation === 'delete') {
      const sql = `DELETE FROM "${sanitizedTable}"${whereSql} RETURNING *;`
      const res = await query(sql, params)
      return NextResponse.json({
        data: isSingle ? res.rows[0] ?? null : res.rows,
        count: res.rowCount,
        error: null,
      })
    }

    // Default: 'select'
    if (isCount && isHead) {
      const countRes = await query(`SELECT COUNT(*) as count FROM "${sanitizedTable}"${whereSql};`, params)
      const countVal = parseInt(countRes.rows[0]?.count, 10) || 0
      return NextResponse.json({ data: null, count: countVal, error: null })
    }

    let sql = ''
    if (sanitizedTable === 'employees' && (selectCols.includes('departments') || selectCols.includes('designations'))) {
      sql = `
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
        ${orderCol ? ` ORDER BY e."${orderCol.replace(/[^a-zA-Z0-9_]/g, '')}" ${orderAsc ? 'ASC' : 'DESC'}` : ''}
        ${limitSql};
      `
    } else if (sanitizedTable === 'leave_applications' && (selectCols.includes('employees') || selectCols.includes('leave_types'))) {
      sql = `
        SELECT 
          la.*,
          CASE WHEN e.id IS NOT NULL THEN json_build_object('first_name', e.first_name, 'last_name', e.last_name, 'photo_url', e.photo_url) ELSE NULL END as employees,
          CASE WHEN lt.id IS NOT NULL THEN json_build_object('name', lt.name) ELSE NULL END as leave_types
        FROM leave_applications la
        LEFT JOIN employees e ON la.employee_id = e.id
        LEFT JOIN leave_types lt ON la.leave_type_id = lt.id
        ${whereParts.length > 0 ? ` WHERE ${whereParts.map(p => p.replace(/\"([a-z_]+)\"/g, 'la."$1"')).join(' AND ')}` : ''}
        ${orderCol ? ` ORDER BY la."${orderCol.replace(/[^a-zA-Z0-9_]/g, '')}" ${orderAsc ? 'ASC' : 'DESC'}` : ''}
        ${limitSql};
      `
    } else {
      const safeCols =
        selectCols === '*' || selectCols.includes('(') || selectCols.includes('!')
          ? '*'
          : selectCols
              .split(',')
              .map((c: string) => `"${c.trim().replace(/[^a-zA-Z0-9_]/g, '')}"`)
              .join(', ')

      sql = `SELECT ${safeCols} FROM "${sanitizedTable}"${whereSql}${orderSql}${limitSql};`
    }

    const res = await query(sql, params)

    return NextResponse.json({
      data: isSingle ? res.rows[0] ?? null : res.rows,
      count: res.rowCount,
      error: null,
    })
  } catch (err: any) {
    console.error('[Neon Query Route Error]:', err?.message)
    return NextResponse.json({ data: isSingle ? null : [], count: 0, error: err?.message || 'Database error' }, { status: 500 })
  }
}

