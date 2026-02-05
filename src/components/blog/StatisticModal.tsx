"use client"

import { X, ThumbsUp, MessageCircle } from "lucide-react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { getPostLikes, getPostComments } from "@/lib/api"

type Props = {
  open: boolean
  postId: number | null
  onClose: () => void
}

export default function StatisticModal({
  open,
  postId,
  onClose,
}: Props) {
  const [tab, setTab] = useState<"like" | "comment">("like")

  const { data: likes = [] } = useQuery({
    queryKey: ["post-likes", postId],
    queryFn: () => getPostLikes(postId as number),
    enabled: !!postId && tab === "like",
  })

  const { data: comments = [] } = useQuery({
    queryKey: ["post-comments", postId],
    queryFn: () => getPostComments(postId as number),
    enabled: !!postId && tab === "comment",
  })

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Statistic
          </h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* TABS */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setTab("like")}
            className={`flex-1 pb-2 text-sm flex items-center justify-center gap-2 ${
              tab === "like"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            <ThumbsUp size={16} /> Like
          </button>

          <button
            onClick={() => setTab("comment")}
            className={`flex-1 pb-2 text-sm flex items-center justify-center gap-2 ${
              tab === "comment"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            <MessageCircle size={16} /> Comment
          </button>
        </div>

        {/* CONTENT */}
        {tab === "like" && (
          <div className="space-y-4">
            <p className="text-sm font-medium">
              Like ({likes.length})
            </p>

            {likes.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3"
              >
                <img
                  src={user.avatarUrl}
                  className="h-9 w-9 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.headline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "comment" && (
          <div className="space-y-4">
            <p className="text-sm font-medium">
              Comment ({comments.length})
            </p>

            {comments.map((c) => (
              <div key={c.id} className="border-b pb-3">
                <div className="flex items-center gap-3 mb-1">
                  <img
                    src={c.author.avatarUrl}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {c.author.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {dayjs(c.createdAt).format(
                        "DD MMM YYYY"
                      )}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-700">
                  {c.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
