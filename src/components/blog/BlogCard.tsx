"use client"

import { ThumbsUp, MessageCircle } from "lucide-react"
import dayjs from "dayjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { BlogPost } from "@/types/blog"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "@/lib/api"
import DeletePostModal from "./DeletePostModal"
import StatisticModal from "./StatisticModal"

type Props = {
  post: BlogPost
  showActions?: boolean
}

export default function BlogCard({
  post,
  showActions = false,
}: Props) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [openDelete, setOpenDelete] = useState(false)
  const [openStatistic, setOpenStatistic] = useState(false)
  const [statPostId, setStatPostId] = useState<number | null>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      })
      setOpenDelete(false)
    },
  })

  return (
    <>
      <div className="flex gap-6 border-b pb-6">
        {/* IMAGE */}
        <Link href={`/blogs/${post.id}`}>
          <img
            src={post.imageUrl || "/placeholder.jpg"}
            alt={post.title}
            className="h-40 w-60 rounded-lg object-cover cursor-pointer"
          />
        </Link>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col gap-2">
          <Link href={`/blogs/${post.id}`}>
            <h2 className="text-lg font-semibold hover:underline cursor-pointer">
              {post.title}
            </h2>
          </Link>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* PREVIEW */}
          <p className="line-clamp-2 text-sm text-gray-600">
            {post.content.replace(/<[^>]*>?/gm, "")}
          </p>

          {/* FOOTER */}
          <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gray-300" />
              <span className="font-medium">
                {post.author.name}
              </span>
              <span>·</span>
              <span>
                {dayjs(post.createdAt).format("DD MMM YYYY")}
              </span>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <ThumbsUp size={16} /> {post.likes}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={16} /> {post.comments}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          {showActions && (
            <div className="mt-2 flex gap-4 text-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setStatPostId(post.id)
                  setOpenStatistic(true)
                }}
                className="text-blue-600 hover:underline"
              >
                Statistic
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/blogs/edit/${post.id}`)
                }}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenDelete(true)
                }}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      <DeletePostModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => mutate()}
        loading={isPending}
      />

      {/* STATISTIC MODAL */}
      <StatisticModal
        open={openStatistic}
        postId={statPostId}
        onClose={() => {
          setOpenStatistic(false)
          setStatPostId(null)
        }}
      />
    </>
  )
}
