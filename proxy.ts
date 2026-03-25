import { NextResponse, type NextRequest } from "next/server";

import { getBrandEntryByDomain } from "@/lib/site-content";

const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname) ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  const host = request.headers.get("host");
  if (!host) {
    return NextResponse.next();
  }

  const brand = getBrandEntryByDomain(host);

  if (!brand || brand.role === "canonical" || pathname !== "/") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/brands/${brand.slug}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/:path*"],
};
