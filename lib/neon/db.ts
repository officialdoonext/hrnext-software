import dns from 'dns'
import { Pool, type QueryResult, type QueryResultRow } from 'pg'

// Ensure public DNS resolution fallback for Neon AWS endpoint
try {
  dns.setServers(['8.8.8.8', '1.1.1.1'])
} catch {}

const NEON_HOST = 'ep-lucky-silence-b3vzkr8d.c-4.ap-southeast-1.aws.neon.tech'
// Verified resilient IPs for Neon Singapore region
const FALLBACK_IPS = ['3.0.27.201', '52.76.246.190', '52.76.212.156']

let activeHost = NEON_HOST

// Singleton pool instance across Next.js hot reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var __neon_pool: Pool | undefined
}

export function getPool(): Pool {
  if (!global.__neon_pool) {
    global.__neon_pool = new Pool({
      host: activeHost,
      port: 5432,
      user: 'neondb_owner',
      password: 'npg_Z0xMEcgFzj1l',
      database: 'neondb',
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: {
        rejectUnauthorized: false,
        servername: NEON_HOST,
      },
    })
  }
  return global.__neon_pool
}

export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  try {
    const pool = getPool()
    return await pool.query<T>(text, params)
  } catch (err: any) {
    // If DNS resolution fails on the host name, switch activeHost to fallback IP and reconnect
    if (err?.code === 'ENOTFOUND' && activeHost === NEON_HOST) {
      activeHost = FALLBACK_IPS[0]
      if (global.__neon_pool) {
        await global.__neon_pool.end().catch(() => {})
        global.__neon_pool = undefined
      }
      const pool = getPool()
      return await pool.query<T>(text, params)
    }
    throw err
  }
}

export default { query, getPool }
