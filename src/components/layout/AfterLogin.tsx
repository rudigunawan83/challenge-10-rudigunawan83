"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PenLine, User, LogOut } from "lucide-react"
import { useAuth } from "@/app/providers"
import Link from "next/link"

export default function AfterLogin() {
  const { user, setUser } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  /* =====================
     CLOSE ON OUTSIDE CLICK
  ===================== */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!user) return null

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  const handleProfile = () => {
    if (!user.username) return
    setOpen(false)
    router.push(`/profile/${user.username}`)
  }

  return (
    <div className="flex items-center gap-4">
      {/* WRITE POST */}
      <Link
        href="/blogs/create"
        className="flex items-center gap-2 rounded-full border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
      >
        <PenLine size={16} />
        Write Post
      </Link>

      {/* AVATAR + DROPDOWN */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2"
        >
          <img
            src={user.avatarUrl || "/avatar-placeholder.png"}
            alt={user.name}
            className="h-9 w-9 rounded-full object-cover"
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-48 rounded-xl border bg-white shadow-lg">
            <div className="px-4 py-3">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            <div className="border-t">
              <button
                onClick={handleProfile}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
              >
                <User size={16} />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
