import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // NextResponse.rewrite() doesn't forward custom request headers to server
  // components in Next.js 15. If the response is not a redirect, replace it
  // with NextResponse.next() which does forward them, preserving Set-Cookie.
  const status = response.status;
  const isRedirect = status === 301 || status === 302 || status === 307 || status === 308;
  if (!isRedirect) {
    const pathname = request.nextUrl.pathname;
    const locale =
      (routing.locales as readonly string[]).find(
        (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
      ) ?? routing.defaultLocale;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-next-intl-locale", locale);

    const next = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.forEach((val, key) => next.headers.set(key, val));
    return next;
  }

  return response;
}

export const config = {
  matcher: [
    // Match root and locale prefixes, skip Next.js internals and static files
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
