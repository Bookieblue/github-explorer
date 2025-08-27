import type { Metadata } from "next"
import { Providers } from "./provider"   // ✅ import your wrapper
import "./globals.css"

export const metadata: Metadata = {
  title: "Github Explorer",
  description: "search for profiles",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers session={null}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
