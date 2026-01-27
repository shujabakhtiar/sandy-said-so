import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

const allowedOrigins = [
  'https://www.sandysaidso.app',
  'https://www.sandysaidso.app/',
  'https://sandysaidso.vercel.app/',
  'http://localhost:3000/',
  'http://localhost:5173/'
];

function isAllowedOrigin(origin: string) {
  return allowedOrigins.includes(origin) || /^http:\/\/localhost(:\d+)?$/.test(origin);
}

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') ?? '';
  const isAllowed = isAllowedOrigin(origin);

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    if (isAllowed) {
      return new NextResponse(null, {
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }
    return new NextResponse(null, { status: 200 });
  }

  const response = await updateSession(request);

  if (isAllowed) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
