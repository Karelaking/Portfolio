import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
     throw new Error(
       'Missing Supabase Environment Variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
     )
  }

  try {
    new URL(supabaseUrl)
  } catch (error) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl}. It must be a valid URL starting with https://`
    )
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}
