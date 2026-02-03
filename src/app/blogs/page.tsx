"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import BlogCard from "@/components/blog/BlogCard"
import MostLikedCard from "@/components/blog/MostLikedCard"
import {
  getRecommendedPosts,
  getMostLikedPosts,
  searchPosts,
} from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export default function BlogsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const searchQuery = searchParams.get("search")
  const page = Number(searchParams.get("page") || 1)
  const limit = 10

  /* =========================
      LEFT CONTENT (MAIN LIST)
     ========================= */

  const {
    data: postsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", searchQuery, page],
    queryFn: () =>
      searchQuery
        ? searchPosts(searchQuery, page, limit)
        : getRecommendedPosts(page, limit),
    placeholderData: (previousData) => previousData,
  })

  /* =========================
      RIGHT CONTENT (MOST LIKED)
     ========================= */

  const { data: mostLikedData } = useQuery({
    queryKey: ["most-liked"],
    queryFn: () => getMostLikedPosts(1, 5),
    staleTime: 1000 * 60 * 5, // cache 5 menit
  })

  /* =========================
      PAGINATION HANDLER
     ========================= */

  const changePage = (newPage: number) => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    params.set("page", String(newPage))
    router.push(`/blogs?${params.toString()}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-6 py-8">
        {/* ================= LEFT ================= */}
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
          ) : postsData?.data.length === 0 ? (
            <p className="text-sm text-gray-500">
              No articles found.
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {postsData?.data.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {postsData && (
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

        {/* ================= RIGHT ================= */}
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

      <Footer />
    </div>
  )
}
