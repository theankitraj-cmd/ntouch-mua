import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const isSubdomain = hostname.startsWith("blog.");

  if (isSubdomain) {
    const url = req.nextUrl;
    if (url.pathname === "/") {
      url.pathname = "/blog";
    } else if (!url.pathname.startsWith("/blog") && !url.pathname.includes(".")) {
      url.pathname = `/blog${url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
