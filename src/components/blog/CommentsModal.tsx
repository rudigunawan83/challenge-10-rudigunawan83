"use client"

import { X } from "lucide-react"
import dayjs from "dayjs"
import { useState } from "react"
import { createComment } from "@/lib/api"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useAuth } from "@/app/providers"

export default function CommentsModal({
  open,
  onClose,
  postId,
  comments,
}: any) {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const handleSend = async () => {
    const trimmed = content.trim()

    if (!trimmed) {
      toast.error("Comment cannot be empty")
      return
    }

    try {
      setLoading(true)
      await createComment(postId, trimmed)
      setContent("")
      toast.success("Comment posted")

      queryClient.invalidateQueries({
        queryKey: ["post-comments", postId],
      })

      onClose()
    } catch (err: any) {
      toast.error(err.message || "Failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-lg rounded-xl bg-white">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Comments ({comments.length})
          </h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {user && (
          <div className="border-b px-6 py-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your comment"
              rows={4}
              className="w-full rounded-lg border p-3 text-sm"
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleSend}
                disabled={loading}
                className="rounded-full bg-blue-600 px-8 py-2 text-sm text-white"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
          {comments.map((c: any) => (
            <div key={c.id} className="border-b py-4">
              <div className="flex gap-3">
                <img
                  src={c.author.avatarUrl || "/avatar-placeholder.png"}
                  className="h-9 w-9 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">
                    {c.author.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {dayjs(c.createdAt).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm">{c.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
