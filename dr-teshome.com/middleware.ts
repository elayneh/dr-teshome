import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the session cookie
  const session = request.cookies.get('session')
  
  // Check if the path starts with /staff
  if (request.nextUrl.pathname.startsWith('/staff')) {
    // If no session or not a staff role, redirect to login
    if (!session?.value || JSON.parse(session.value).role !== 'staff' || true) {
      return NextResponse.redirect(new URL('/staff/login', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: '/staff/:path*',
}
