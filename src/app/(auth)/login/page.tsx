"use client"

import { useState } from "react"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"
import Link from "next/link"
import toast from "react-hot-toast"
import { Eye, EyeOff } from "lucide-react"
import { loginUser, getProfile } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/providers"

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuth()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.email) newErrors.email = "Email is required"
    if (!form.password) newErrors.password = "Password is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    try {
      /* =====================
         1. LOGIN → TOKEN
      ===================== */
      const { token } = await loginUser({
        email: form.email,
        password: form.password,
      })

      localStorage.setItem("access_token", token)

      /* =====================
         2. FETCH PROFILE
      ===================== */
      const user = await getProfile()

      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)

      toast.success("Login successful 🎉")
      router.push("/blogs")
    } catch (error: any) {
      toast.error(error.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-xl font-semibold">
          Sign In
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            error={!!errors.email}
            helperText={errors.email}
          />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            rightIcon={
              showPassword ? (
                <EyeOff
                  size={18}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  size={18}
                  onClick={() => setShowPassword(true)}
                />
              )
            }
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
