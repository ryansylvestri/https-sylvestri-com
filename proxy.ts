import { NextResponse, type NextRequest } from "next/server";

import { getBrandEntryByDomain } from "@/lib/site-content";

const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host");

  const noIndexPaths = [
    pathname === "/login",
    pathname === "/account",
    pathname === "/kpi",
    pathname === "/thank-you",
    pathname.startsWith("/auth"),
    pathname.startsWith("/api"),
  ];

  if (host?.toLowerCase() === "www.sylvestri.com") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.host = "sylvestri.com";
    redirectUrl.protocol = "https";
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname) ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    const response = NextResponse.next();
    if (noIndexPaths.some(Boolean)) {
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    }
    return response;
  }

  if (!host) {
    const response = NextResponse.next();
    if (noIndexPaths.some(Boolean)) {
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    }
    return response;
  }

  const brand = getBrandEntryByDomain(host);

  if (!brand || brand.role === "canonical" || pathname !== "/") {
    const response = NextResponse.next();
    if (noIndexPaths.some(Boolean)) {
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    }
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/brands/${brand.slug}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/:path*"],
};
