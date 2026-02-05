"use client"

import { useParams } from "next/navigation"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import dayjs from "dayjs"
import { useState } from "react"
import {
  getPostById,
  getPostComments,
  createComment,
  getRecommendedPosts,
} from "@/lib/api"
import { useAuth } from "@/app/providers"
import CommentsModal from "@/components/blog/CommentsModal"
import { ThumbsUp, MessageCircle } from "lucide-react"
import toast from "react-hot-toast"

export default function BlogDetailPage() {
  const { id } = useParams()
  const postId = Number(id)

  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [comment, setComment] = useState("")
  const [openModal, setOpenModal] = useState(false)

  /* ================= POST ================= */
  const { data: post } = useQuery({
    queryKey: ["post-detail", postId],
    queryFn: () => getPostById(postId),
    enabled: Number.isFinite(postId),
  })

  /* ================= COMMENTS ================= */
  const { data: comments = [] } = useQuery({
    queryKey: ["post-comments", postId],
    queryFn: () => getPostComments(postId),
    enabled: Number.isFinite(postId),
  })

  /* ================= ANOTHER POST ================= */
  const { data: recommended } = useQuery({
    queryKey: ["recommended-posts"],
    queryFn: () => getRecommendedPosts(1, 2),
  })

  const anotherPost =
    recommended?.data.find((p) => p.id !== postId) ||
    recommended?.data[0]

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const trimmed = comment.trim()

    if (!user) {
      toast.error("Please login to comment")
      return
    }

    if (!trimmed) {
      toast.error("Comment cannot be empty")
      return
    }

    if (trimmed.length > 2000) {
      toast.error("Comment must be less than 2000 characters")
      return
    }

    try {
      await createComment(postId, trimmed)
      setComment("")
      toast.success("Comment posted")

      queryClient.invalidateQueries({
        queryKey: ["post-comments", postId],
      })
    } catch (err: any) {
      toast.error(err.message || "Failed to post comment")
    }
  }

  if (!post) return null

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-10">
        {/* TITLE */}
        <h1 className="mb-3 text-3xl font-bold">{post.title}</h1>

        {/* TAGS */}
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* AUTHOR */}
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <img
            src={post.author.avatarUrl || "/avatar-placeholder.png"}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="font-medium text-gray-700">
            {post.author.name}
          </span>
          · {dayjs(post.createdAt).format("DD MMM YYYY")}
        </div>

        {/* LIKE & COMMENT */}
        <div className="mt-4 flex gap-6 border-b pb-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <ThumbsUp size={16} /> {post.likes}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={16} /> {comments.length}
          </div>
        </div>

        {/* IMAGE */}
        {post.imageUrl && (
          <div className="my-8 overflow-hidden rounded-xl">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* CONTENT */}
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ================= COMMENTS ================= */}
        <section className="mt-12">
          <h2 className="mb-3 text-lg font-semibold">
            Comments ({comments.length})
          </h2>

          {/* USER LOGIN INFO */}
          {user && (
            <div className="mb-4 flex items-center gap-3">
              <img
                src={user.avatarUrl || "/avatar-placeholder.png"}
                className="h-9 w-9 rounded-full"
              />
              <span className="font-medium text-sm">
                {user.name}
              </span>
            </div>
          )}

          {/* INPUT */}
          {user && (
            <div className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your comment"
                className="w-full rounded-lg border p-3 text-sm"
                rows={3}
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="rounded-full bg-blue-600 px-6 py-2 text-sm text-white"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* PREVIEW COMMENTS */}
          {comments.slice(0, 3).map((c) => (
            <div key={c.id} className="flex gap-3 border-b py-4">
              <img
                src={c.author.avatarUrl || "/avatar-placeholder.png"}
                className="h-9 w-9 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">
                  {c.author.name}
                </p>
                {c.author.headline && (
                  <p className="text-xs text-gray-400">
                    {c.author.headline}
                  </p>
                )}
                <p className="text-xs text-gray-400">
                  {dayjs(c.createdAt).format("DD MMM YYYY")}
                </p>
                <p className="mt-1 text-sm">{c.content}</p>
              </div>
            </div>
          ))}

          {comments.length > 3 && (
            <button
              onClick={() => setOpenModal(true)}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              See All Comments
            </button>
          )}
        </section>

        {/* ================= ANOTHER POST ================= */}
        {anotherPost && (
          <section className="mt-16 border-t pt-8">
            <h3 className="mb-4 text-lg font-semibold">
              Another Post
            </h3>

            <div className="flex gap-6">
              <img
                src={anotherPost.imageUrl || "/placeholder.jpg"}
                className="h-40 w-60 rounded-lg object-cover"
              />

              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-semibold">
                  {anotherPost.title}
                </h4>

                <div className="flex flex-wrap gap-2">
                  {anotherPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="line-clamp-2 text-sm text-gray-600">
                  {anotherPost.content.replace(/<[^>]*>/g, "")}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <img
                    src="/avatar-placeholder.png"
                    className="h-6 w-6 rounded-full"
                  />
                  {anotherPost.author.name} ·{" "}
                  {dayjs(anotherPost.createdAt).format("DD MMM YYYY")}
                </div>

                <div className="flex gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={14} />
                    {anotherPost.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {anotherPost.comments}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <CommentsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        postId={postId}
        comments={comments}
      />

      <footer className="mt-20 border-t py-6 text-center text-sm text-gray-500">
        © 2025 Web Programming Hack Blog. All rights reserved.
      </footer>
    </>
  )
}
