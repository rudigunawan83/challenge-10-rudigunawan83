"use client"

import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getUserProfileByUsername } from "@/lib/api"
import BlogCard from "@/components/blog/BlogCard"

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()

  const page = Number(searchParams.get("page") || 1)
  const limit = 10

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", username, page],
    queryFn: () =>
      getUserProfileByUsername(username, page, limit),
    enabled: !!username,
  })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-sm text-gray-500">Loading profile...</p>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-sm text-red-500">
          Failed to load profile
        </p>
      </div>
    )
  }

  const { name, headline, avatarUrl, posts } = data

  const changePage = (newPage: number) => {
    router.push(`/profile/${username}?page=${newPage}`)
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* ================= PROFILE HEADER ================= */}
      <div className="flex items-center gap-4 border-b pb-6">
        <img
          src={avatarUrl || "/avatar-placeholder.png"}
          alt={name}
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>
          <h1 className="text-lg font-semibold">{name}</h1>
          {headline && (
            <p className="text-sm text-gray-500">
              {headline}
            </p>
          )}
        </div>
      </div>

      {/* ================= POSTS ================= */}
      <div className="mt-8">
        <h2 className="mb-4 font-semibold">
          {posts.total} Post
        </h2>

        {posts.data.length === 0 ? (
          /* ================= EMPTY STATE ================= */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <img
              src="/empty-posts.svg"
              alt="No posts"
              className="mb-6 h-32"
            />
            <p className="font-medium">
              No posts from this user yet
            </p>
            <p className="text-sm text-gray-500">
              Stay tuned for future posts
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {posts.data.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* ================= PAGINATION ================= */}
            {posts.lastPage > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  disabled={page === 1}
                  onClick={() => changePage(page - 1)}
                  className="text-sm disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
                  {page}
                </span>

                <button
                  disabled={page === posts.lastPage}
                  onClick={() => changePage(page + 1)}
                  className="text-sm disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
