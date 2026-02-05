import "./globals.css"
import { Toaster } from "react-hot-toast"
import Providers from "./providers"
import Header from "@/components/layout/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        <Providers>
          <Header />
          {children}
        </Providers>

        <Toaster position="top-right" />
      </body>
    </html>
  )
}
