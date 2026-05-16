import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match root and locale prefixes, skip Next.js internals and static files
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
