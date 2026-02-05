"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

export type User = {
  id: number
  name: string
  email: string
  headline?: string
  username?: string   // ✅ wajib
  avatarUrl?: string
}


type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// ✅ React Query Client (SINGLETON)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated: !!user,
          setUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used inside Providers")
  }
  return ctx
}
