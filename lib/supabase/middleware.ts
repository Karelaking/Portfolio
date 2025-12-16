import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
     // If env vars are missing, we can't create the client.
     // Return a generic response or let the request proceed without Supabase
     // (though this means no auth).
     // However, throwing here might crash the server startup or every request.
     // Best to just return valid response and let the page handle the error context if possible, 
     // or just throw if we want to stop.
     // Given "Runtime Error" report, throwing in middleware is fatal.
     // Let's console error and return response.
     console.error('Middleware: Missing Supabase Environment Variables.')
     return supabaseResponse
  }

  try {
    new URL(supabaseUrl)
  } catch (error) {
     console.error(`Middleware: Invalid NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl}. It must be a valid URL.`)
     return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value, options)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run on static assets
  if (request.nextUrl.pathname.startsWith('/_next') || 
      request.nextUrl.pathname.includes('.')) {
      return supabaseResponse
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!user) {
          const url = request.nextUrl.clone()
          url.pathname = '/login'
          return NextResponse.redirect(url)
      }
  }

  return supabaseResponse
}
