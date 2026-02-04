"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import BeforeLogin from "./BeforeLogin"
import AfterLogin from "./AfterLogin"

export default function Header() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("search") || ""

  const [query, setQuery] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    router.push(`/blogs?search=${encodeURIComponent(query)}&page=1`)
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">

        {/* LOGO */}
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-lg font-bold shrink-0"
        >
          <div className="h-8 w-8 rounded bg-blue-600" />
          Your Logo
        </Link>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="relative mx-auto w-full max-w-md"
        >
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full rounded-full border px-11 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </form>

        {/* AUTH */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/login"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  )
}
