"use client"

import { useState, useRef, useEffect } from "react"
import { X, Camera } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { updateProfile } from "@/lib/api"
import { useAuth } from "@/app/providers"
import type { User } from "@/types/blog"

type Props = {
  open: boolean
  onClose: () => void
}

export default function EditProfileModal({
  open,
  onClose,
}: Props) {
  const { user, setUser } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState("")
  const [headline, setHeadline] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [toast, setToast] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  /* =====================
     PREFILL FORM
  ===================== */
  useEffect(() => {
    if (open && user) {
      setName(user.name)
      setHeadline(user.headline || "")
      setPreview(user.avatarUrl || null)
      setAvatar(null)
    }
  }, [open, user])

  const { mutate, isPending } = useMutation<
    User,
    Error,
    FormData
  >({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      setUser(data) // ✅ REAL-TIME UPDATE
      setToast({
        type: "success",
        message: "Profile updated successfully",
      })
      setTimeout(() => {
        setToast(null)
        onClose()
      }, 1200)
    },
    onError: (err) => {
      setToast({
        type: "error",
        message: err.message || "Update failed",
      })
    },
  })

  if (!open) return null

  const handleSubmit = () => {
    if (!user) return

    const formData = new FormData()

    if (name !== user.name)
      formData.append("name", name)

    if (headline !== user.headline)
      formData.append("headline", headline)

    if (avatar) formData.append("avatar", avatar)

    mutate(formData)
  }

  const handleAvatarChange = (file?: File) => {
    if (!file) return
    setAvatar(file)
    setPreview(URL.createObjectURL(file))
  }

  return (
    <>
      {/* OVERLAY */}
      <div className="fixed inset-0 z-40 bg-black/40" />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-md rounded-xl bg-white p-6">
          {/* HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Edit Profile
            </h2>
            <button onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          {/* AVATAR */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <img
                src={
                  preview || "/avatar-placeholder.png"
                }
                className="h-20 w-20 rounded-full object-cover"
              />
              <button
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white"
              >
                <Camera size={14} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                hidden
                onChange={(e) =>
                  handleAvatarChange(
                    e.target.files?.[0]
                  )
                }
              />
            </div>
          </div>

          {/* NAME */}
          <div className="mb-4">
            <label className="text-sm font-medium">
              Name
            </label>
            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* HEADLINE */}
          <div className="mb-6">
            <label className="text-sm font-medium">
              Profile Headline
            </label>
            <input
              value={headline}
              onChange={(e) =>
                setHeadline(e.target.value)
              }
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* ACTION */}
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="h-[44px] w-full rounded-full bg-blue-600 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending
              ? "Updating..."
              : "Update Profile"}
          </button>
        </div>
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
