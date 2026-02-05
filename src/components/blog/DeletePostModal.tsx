"use client"

import { X } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

export default function DeletePostModal({
  open,
  onClose,
  onConfirm,
  loading,
}: Props) {
  if (!open) return null

  return (
    <>
      {/* OVERLAY */}
      <div className="fixed inset-0 z-40 bg-black/40" />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-md rounded-xl bg-white p-6">
          {/* HEADER */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Delete
            </h2>
            <button onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          {/* CONTENT */}
          <p className="mb-6 text-sm text-gray-600">
            Are you sure to delete?
          </p>

          {/* ACTION */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="h-[36px] rounded-full bg-red-500 px-6 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
