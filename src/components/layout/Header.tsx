"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/blogs" className="flex items-center gap-2 font-bold text-lg">
          <div className="h-8 w-8 rounded bg-blue-600" />
          Your Logo
        </Link>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="relative w-96 max-w-full"
        >
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full rounded-full border px-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </form>

        {/* AUTH */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-blue-600">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  )
}
