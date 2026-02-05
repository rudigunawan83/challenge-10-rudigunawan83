"use client"

import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/app/providers"
import BeforeLogin from "./BeforeLogin"
import AfterLogin from "./AfterLogin"

export default function Header() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get("search") || ""
  const [query, setQuery] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
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
          className="flex items-center gap-2 shrink-0"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={32}
            priority
            className="h-8 w-auto object-contain"
          />
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
        <div className="shrink-0">
          {isAuthenticated ? <AfterLogin /> : <BeforeLogin />}
        </div>
      </div>
    </header>
  )
}
