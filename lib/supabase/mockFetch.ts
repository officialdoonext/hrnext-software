import { TABLE_MOCK_MAP } from './mockData'

export const isDemoMode =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('demo-project.supabase.co') ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')

function getHeader(headers: HeadersInit | undefined, name: string): string | undefined {
  if (!headers) return undefined
  if (typeof (headers as any).get === 'function') {
    return (headers as any).get(name) ?? undefined
  }
  const lower = name.toLowerCase()
  if (typeof headers === 'object' && !Array.isArray(headers)) {
    for (const key of Object.keys(headers)) {
      if (key.toLowerCase() === lower) {
        return (headers as Record<string, string>)[key]
      }
    }
  }
  return undefined
}

export async function mockFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const urlStr = typeof input === 'string' ? input : input instanceof URL ? input.toString() : (input as Request).url
  const parsedUrl = new URL(urlStr)
  const pathname = parsedUrl.pathname
  const method = (init?.method || 'GET').toUpperCase()
  const acceptHeader = getHeader(init?.headers, 'accept') || ''
  const isSingle = acceptHeader.includes('vnd.pgrst.object+json')

  // 1. Auth requests (/auth/v1/...)
  if (pathname.includes('/auth/v1/')) {
    if (pathname.includes('/user') || pathname.includes('/session')) {
      return new Response(
        JSON.stringify({
          user: null,
          session: null,
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // 2. PostgREST table queries (/rest/v1/<table_name>)
  if (pathname.includes('/rest/v1/')) {
    const segments = pathname.split('/rest/v1/')[1]?.split('/') || []
    const tableName = segments[0]?.split('?')[0] || ''

    const dataList = TABLE_MOCK_MAP[tableName] || []
    const totalCount = dataList.length

    // Handle mutations (POST, PATCH, PUT, DELETE)
    if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
      let bodyData: any = {}
      try {
        if (typeof init?.body === 'string') {
          bodyData = JSON.parse(init.body)
        }
      } catch {}

      const createdItem = {
        id: `mock-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...bodyData,
      }

      const resBody = isSingle ? JSON.stringify(createdItem) : JSON.stringify([createdItem])
      return new Response(resBody, {
        status: method === 'POST' ? 201 : 200,
        headers: {
          'Content-Type': 'application/json',
          'Preference-Applied': 'return=representation',
        },
      })
    }

    if (method === 'DELETE') {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // HEAD request (count query: { count: 'exact', head: true })
    if (method === 'HEAD') {
      return new Response(null, {
        status: 200,
        headers: {
          'Content-Range': totalCount > 0 ? `0-${totalCount - 1}/${totalCount}` : '0-0/0',
          'Content-Type': 'application/json',
        },
      })
    }

    // GET request (list or single row)
    if (isSingle) {
      const item = dataList[0] || null
      if (!item) {
        return new Response(
          JSON.stringify({
            code: 'PGRST116',
            details: 'The result contains 0 rows',
            message: 'JSON object requested, multiple (or no) rows returned',
          }),
          {
            status: 406,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      }
      return new Response(JSON.stringify(item), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Range': `0-0/${totalCount}`,
        },
      })
    }

    return new Response(JSON.stringify(dataList), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Range': totalCount > 0 ? `0-${totalCount - 1}/${totalCount}` : '0-0/0',
      },
    })
  }

  // 3. Fallback for any other endpoint
  return new Response(JSON.stringify([]), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Content-Range': '0-0/0',
    },
  })
}

