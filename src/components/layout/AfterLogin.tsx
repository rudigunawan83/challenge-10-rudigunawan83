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
        href="/blogs/write"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <PenLine size={18} />
        <span className="text-sm font-medium underline underline-offset-4">
          Write Post
        </span>
      </Link>

      {/* PIPE */}
      <span className="text-gray-300">|</span>

      
      {/* AVATAR + DROPDOWN */}
      <div className="relative" ref={dropdownRef}>
        <button
          aria-label="User menu"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center"
        >
          <img
            src={user.avatarUrl || "/avatar-placeholder.png"}
            alt={user.name}
            className="h-9 w-9 rounded-full object-cover"
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-48 rounded-xl border bg-white shadow-lg z-50">
            <div className="px-4 py-3">
              <p className="text-sm font-semibold">
                {user.name}
              </p>
              <p className="text-xs text-gray-500">
                {user.email}
              </p>
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

      {/* USER NAME */}
      <span className="text-sm font-medium text-gray-800">
        {user.name}
      </span>


    </div>
  )
}
