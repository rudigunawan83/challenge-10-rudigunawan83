"use client"

import { ThumbsUp, MessageCircle } from "lucide-react"
import dayjs from "dayjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { BlogPost } from "@/types/blog"
import { useState } from "react"
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import {
  deletePost,
  togglePostLike,
} from "@/lib/api"
import DeletePostModal from "./DeletePostModal"
import StatisticModal from "./StatisticModal"


type ProfileQuery = {
  posts: {
    data: BlogPost[]
  }
}

type PostStatistic = {
  likes: number
  comments: number
  likedByMe: boolean
}

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

  const [openDelete, setOpenDelete] =
    useState(false)
  const [openStatistic, setOpenStatistic] =
    useState(false)

  /* =====================
     DELETE POST
  ===================== */
  const deleteMutation = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      })
      setOpenDelete(false)
    },
  })

  /* =====================
     LIKE TOGGLE (OPTIMISTIC)
  ===================== */
 const likeMutation = useMutation({
  mutationFn: () => togglePostLike(post.id),

  onMutate: async () => {
    await Promise.all([
      queryClient.cancelQueries({
        queryKey: ["profile"],
      }),
      queryClient.cancelQueries({
        queryKey: ["post-statistic", post.id],
      }),
    ])

    const previousProfile =
      queryClient.getQueryData<ProfileQuery>([
        "profile",
      ])

    const previousStatistic =
      queryClient.getQueryData<PostStatistic>([
        "post-statistic",
        post.id,
      ])

    // 🔥 UPDATE PROFILE LIST
    queryClient.setQueryData<ProfileQuery>(
      ["profile"],
      (old) => {
        if (!old) return old

        return {
          ...old,
          posts: {
            ...old.posts,
            data: old.posts.data.map((p) =>
              p.id === post.id
                ? {
                    ...p,
                    likedByMe: !p.likedByMe,
                    likes: p.likedByMe
                      ? p.likes - 1
                      : p.likes + 1,
                  }
                : p
            ),
          },
        }
      }
    )

    // 🔥 UPDATE STATISTIC
    queryClient.setQueryData<PostStatistic>(
      ["post-statistic", post.id],
      (old) => {
        if (!old) return old

        return {
          ...old,
          likes: old.likedByMe
            ? old.likes - 1
            : old.likes + 1,
          likedByMe: !old.likedByMe,
        }
      }
    )

    return {
      previousProfile,
      previousStatistic,
    }
  },

  onError: (_err, _var, ctx) => {
    if (ctx?.previousProfile) {
      queryClient.setQueryData(
        ["profile"],
        ctx.previousProfile
      )
    }
    if (ctx?.previousStatistic) {
      queryClient.setQueryData(
        ["post-statistic", post.id],
        ctx.previousStatistic
      )
    }
  },

  onSettled: () => {
    queryClient.invalidateQueries({
      queryKey: ["profile"],
    })

    queryClient.invalidateQueries({
      queryKey: ["post-statistic", post.id],
    })
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
            <h2 className="text-lg font-semibold hover:underline">
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
            {post.content.replace(
              /<[^>]*>?/gm,
              ""
            )}
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
                {dayjs(post.createdAt).format(
                  "DD MMM YYYY"
                )}
              </span>
            </div>

            {/* LIKE & COMMENT */}
            <div className="flex gap-4">
              <button
                onClick={() =>
                  likeMutation.mutate()
                }
                disabled={likeMutation.isPending}
                className={`flex items-center gap-1 transition ${
                  post.likedByMe
                    ? "text-blue-600"
                    : ""
                } disabled:opacity-50`}
              >
                <ThumbsUp size={16} />
                {post.likes}
              </button>

              <div className="flex items-center gap-1">
                <MessageCircle size={16} />
                {post.comments}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          {showActions && (
            <div className="mt-2 flex gap-4 text-sm">
              <button
                onClick={() =>
                  setOpenStatistic(true)
                }
                className="text-blue-600 hover:underline"
              >
                Statistic
              </button>

              <button
                onClick={() =>
                  router.push(
                    `/blogs/edit/${post.id}`
                  )
                }
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  setOpenDelete(true)
                }
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      <DeletePostModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() =>
          deleteMutation.mutate()
        }
        loading={deleteMutation.isPending}
      />

      <StatisticModal
        open={openStatistic}
        postId={post.id}
        onClose={() =>
          setOpenStatistic(false)
        }
      />
    </>
  )
}
