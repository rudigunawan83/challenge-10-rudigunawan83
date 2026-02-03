"use client"

import { useState } from "react"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"
import Link from "next/link"
import toast from "react-hot-toast"
import { Eye, EyeOff } from "lucide-react"
import { loginUser } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    try {
      const res = await loginUser({
        email: form.email,
        password: form.password,
      })

      // 🔐 Simpan token (sementara pakai localStorage)
      const token = res.accessToken || res.token
      if (token) {
        localStorage.setItem("access_token", token)
      }

      toast.success("Login successful 🎉")
      router.push("/blogs") // next step: protected page
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
          {/* EMAIL */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              error={!!errors.email}
              helperText={errors.email || "Error Text Helper"}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Password
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              error={!!errors.password}
              helperText={errors.password || "Error Text Helper"}
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
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <Button disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
