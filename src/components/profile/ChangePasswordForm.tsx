"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { changePassword } from "@/lib/api"

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] =
    useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [showCurrent, setShowCurrent] =
    useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] =
    useState(false)

  const [toast, setToast] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      setToast({
        type: "success",
        message: data.message,
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    },
    onError: (err: Error) => {
      setToast({
        type: "error",
        message: err.message,
      })
    },
  })

  const handleSubmit = () => {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setToast({
        type: "error",
        message: "All fields are required",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      setToast({
        type: "error",
        message: "Password confirmation does not match",
      })
      return
    }

    mutate({
      currentPassword,
      newPassword,
      confirmPassword,
    })
  }

  return (
    <>
      <div className="max-w-md">
        {/* CURRENT PASSWORD */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Current Password
          </label>
          <div className="relative mt-1">
            <input
              type={
                showCurrent ? "text" : "password"
              }
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              className="w-full rounded-md border px-3 py-2 pr-10"
            />
            <button
              onClick={() =>
                setShowCurrent((v) => !v)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showCurrent ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>
        </div>

        {/* NEW PASSWORD */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            New Password
          </label>
          <div className="relative mt-1">
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="w-full rounded-md border px-3 py-2 pr-10"
            />
            <button
              onClick={() => setShowNew((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showNew ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-6">
          <label className="text-sm font-medium">
            Confirm New Password
          </label>
          <div className="relative mt-1">
            <input
              type={
                showConfirm ? "text" : "password"
              }
              placeholder="Enter confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full rounded-md border px-3 py-2 pr-10"
            />
            <button
              onClick={() =>
                setShowConfirm((v) => !v)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirm ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full h-[44px] rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending
            ? "Updating..."
            : "Update Password"}
        </button>
      </div>

      {/* TOAST */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 rounded-lg px-4 py-3 text-white shadow-lg ${
            toast.type === "success"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </>
  )
}
