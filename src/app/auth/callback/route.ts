import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in search params, use it as the redirection URL
  const next = searchParams.get('next') ?? '/decks'

  if (code) {
    const supabase = await createClient()
    
    console.log(`[Auth Callback] Exchanging code for session... Code length: ${code.length}`)
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      console.log("[Auth Callback] Session exchange successful")
      const forwardedHost = request.headers.get('x-forwarded-host') // Hello, Cloudflare/Vercel
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      const baseUrl = isLocalEnv 
        ? origin 
        : forwardedHost 
          ? `https://${forwardedHost}` 
          : origin

      return NextResponse.redirect(`${baseUrl}${next}`)
    } else {
      console.error("[Auth Callback] Session exchange failed:", error)
      console.error("[Auth Callback] Error Message:", error.message)
      
      // Redirect with error details
      const errorParams = new URLSearchParams({
        error: "access_denied",
        error_code: error.code || "unknown",
        error_description: error.message
      })
      return NextResponse.redirect(`${origin}/auth/auth-code-error?${errorParams.toString()}`)
    }
  } else {
    console.warn("[Auth Callback] No code provided in request")
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error?error=no_code`)
}
