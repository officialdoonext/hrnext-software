export interface QueryResult<T = any> {
  data: any
  error: any | null
  count?: number | null
}

export class ClientNeonQueryBuilder<T = any> implements PromiseLike<QueryResult<T>> {
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
      const res = await fetch('/api/neon/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableName: this.tableName,
          operation: this.mutationType || 'select',
          data: this.mutationData,
          selectCols: this.selectCols,
          filters: this.filters,
          orderCol: this.orderCol,
          orderAsc: this.orderAsc,
          limitCount: this.limitCount,
          isSingle: this.isSingle,
          isCount: this.isCount,
          isHead: this.isHead,
          onConflict: this.onConflict,
        }),
      })

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        return { data: this.isSingle ? null : [], count: 0, error: errJson.error || 'Failed to query database' }
      }

      const json = await res.json()
      return json
    } catch (err: any) {
      return { data: this.isSingle ? null : [], count: 0, error: err?.message || 'Database error' }
    }
  }

  then<TResult1 = QueryResult<T>, TResult2 = never>(
    onfulfilled?: ((value: QueryResult<T>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected)
  }
}

export function createClient() {
  return {
    from: <T = any>(tableName: string) => new ClientNeonQueryBuilder<T>(tableName),
    auth: {
      getUser: async (): Promise<{ data: { user: any }; error: any }> => {
        let sessionUser: any = { id: '00000000-0000-0000-0000-000000000002', email: 'admin@peoplecore.io' }
        if (typeof window !== 'undefined') {
          try {
            const raw = localStorage.getItem('hrms_user')
            if (raw) sessionUser = JSON.parse(raw)
          } catch {}
        }
        return { data: { user: sessionUser }, error: null }
      },
      signOut: async () => {
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('hrms_user')
          } catch {}
        }
        await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
      },
    },
  }
}

export default createClient
