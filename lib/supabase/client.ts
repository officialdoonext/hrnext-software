import { createBrowserClient } from '@supabase/ssr'
import { isDemoMode, mockFetch } from './mockFetch'

export function createClient() {
  return createBrowserClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: isDemoMode ? { fetch: mockFetch } : undefined,
    }
  )
}

