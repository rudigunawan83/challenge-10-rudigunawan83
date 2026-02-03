"use client"

import { useState } from "react"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"
import Link from "next/link"
import toast from "react-hot-toast"
import { Eye, EyeOff } from "lucide-react"
import { registerUser } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  /**
   * Generate username from email
   * example: john.doe@gmail.com -> john.doe
   */
  const generateUsername = (email: string) => {
    return email.split("@")[0]
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!form.name) newErrors.name = "Name is required"
    if (!form.email) newErrors.email = "Email is required"
    if (!form.password) newErrors.password = "Password is required"
    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    try {
      await registerUser({
        name: form.name,
        username: generateUsername(form.email),
        email: form.email,
        password: form.password,
      })

      toast.success("Register successful 🎉")
      router.push("/login")
    } catch (error: any) {
      toast.error(error.message || "Register failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-xl font-semibold">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Name
            </label>
           <Input
                placeholder="Enter your name"
                value={form.name}
                error={!!errors.name}
                helperText={errors.name || "Error Text Helper"}
                onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                }
                />
          </div>

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
                    <EyeOff size={18} onClick={() => setShowPassword(false)} />
                    ) : (
                    <Eye size={18} onClick={() => setShowPassword(true)} />
                    )
                }
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
                />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Confirm Password
            </label>
           <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your confirm password"
                value={form.confirmPassword}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword || "Error Text Helper"}
                rightIcon={
                    showConfirmPassword ? (
                    <EyeOff
                        size={18}
                        onClick={() => setShowConfirmPassword(false)}
                    />
                    ) : (
                    <Eye
                        size={18}
                        onClick={() => setShowConfirmPassword(true)}
                    />
                    )
                }
                onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                }
                />
          </div>

          <Button disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
