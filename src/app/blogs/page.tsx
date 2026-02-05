"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import BlogCard from "@/components/blog/BlogCard"
import MostLikedCard from "@/components/blog/MostLikedCard"
import {
  getRecommendedPosts,
  getMostLikedPosts,
  searchPosts,
} from "@/lib/api"
import type { BlogPost, PaginatedResponse } from "@/types/blog"

export default function BlogsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const searchQuery = searchParams.get("search") || ""
  const page = Number(searchParams.get("page") || 1)
  const limit = 10

  /* =========================
      MAIN POSTS
     ========================= */

  const {
    data: postsData,
    isLoading,
    isError,
  } = useQuery<PaginatedResponse<BlogPost>>({
    queryKey: ["posts", searchQuery, page],
    queryFn: () =>
      searchQuery
        ? searchPosts(searchQuery, page, limit)
        : getRecommendedPosts(page, limit),
    placeholderData: (prev) => prev,
    enabled: page > 0,
  })

  /* =========================
      MOST LIKED
     ========================= */

  const { data: mostLikedData } = useQuery<
    PaginatedResponse<BlogPost>
  >({
    queryKey: ["most-liked"],
    queryFn: () => getMostLikedPosts(1, 5),
    staleTime: 1000 * 60 * 5,
  })

  /* =========================
      PAGINATION
     ========================= */

  const changePage = (newPage: number) => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    params.set("page", String(newPage))
    router.push(`/blogs?${params.toString()}`)
  }

  /* =========================
      EMPTY SEARCH STATE
     ========================= */

  if (
    !isLoading &&
    searchQuery &&
    postsData &&
    postsData.data.length === 0
  ) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
        <img
          src="/empty-posts.svg"
          alt="No results"
          className="h-40 w-40"
        />

        <div>
          <p className="text-lg font-semibold">
            No results found
          </p>
          <p className="text-sm text-gray-500">
            Try using different keywords
          </p>
        </div>

        <button
          onClick={() => router.push("/blogs")}
          className="rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Back to Home
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl gap-8 px-6 py-8">
      {/* LEFT */}
      <section className="flex-1">
        <h1 className="mb-6 text-xl font-semibold">
          {searchQuery
            ? `Search result for "${searchQuery}"`
            : "Recommend For You"}
        </h1>

        {isLoading ? (
          <p className="text-sm text-gray-500">
            Loading articles...
          </p>
        ) : isError ? (
          <p className="text-sm text-red-500">
            Failed to load articles.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {postsData?.data.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {postsData && postsData.lastPage > 1 && (
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
              disabled={page === postsData.lastPage}
              onClick={() => changePage(page + 1)}
              className="text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* RIGHT */}
      <aside className="w-80 border-l pl-6">
        <h2 className="mb-4 font-semibold">
          Most Liked
        </h2>

        <div className="flex flex-col gap-4">
          {mostLikedData?.data.map((post) => (
            <MostLikedCard key={post.id} post={post} />
          ))}
        </div>
      </aside>
    </main>
  )
}
