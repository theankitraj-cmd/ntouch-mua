import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";

  // Check if we are on a subdomain (excluding localhost and previews)
  const isSubdomain = hostname.startsWith("blog.");

  if (isSubdomain) {
    // If accessing the root of the subdomain, go to /blog
    if (url.pathname === "/") {
      url.pathname = "/blog";
    } 
    // If accessing /post-slug, rewrite to /blog/post-slug
    else if (!url.pathname.startsWith("/blog") && !url.pathname.includes(".")) {
      url.pathname = `/blog${url.pathname}`;
    }
    
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Ensure middleware only runs on relevant paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
