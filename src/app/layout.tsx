import "./globals.css"
import { Toaster } from "react-hot-toast"
import Providers from "./providers"
import Header from "@/components/layout/Header"
import { Suspense } from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        <Providers>
          <Suspense fallback={<div className="h-16 border-b bg-white"></div>}>
            <Header />
          </Suspense>
          {children}
        </Providers>

        <Toaster position="top-right" />
      </body>
    </html>
  )
}
