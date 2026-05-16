// Root layout — locale layout at [locale]/layout.tsx handles <html> and <body>.
// This file exists to satisfy Next.js App Router requirements when a
// root-level not-found.tsx is present.
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
