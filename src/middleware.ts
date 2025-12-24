import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const isAuthPage = pathname.startsWith("/api/auth/login") || 
                    pathname.startsWith("/api/auth/signup") ||
                    pathname === "/api/auth/logout";

  // If the request is for an API route and it's not an auth page
  if (pathname.startsWith("/api") && !isAuthPage) {
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
