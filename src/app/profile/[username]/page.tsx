"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getUserProfileByUsername } from "@/lib/api"
import BlogCard from "@/components/blog/BlogCard"
import EditProfileModal from "@/components/profile/EditProfileModal"
import ChangePasswordForm from "@/components/profile/ChangePasswordForm"
import { useAuth } from "@/app/providers"

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string

  const { user } = useAuth()

  const [openEdit, setOpenEdit] = useState(false)
  const [activeTab, setActiveTab] = useState<
    "posts" | "password"
  >("posts")

  const { data, isLoading } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getUserProfileByUsername(username),
  })

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        Loading profile...
      </div>
    )
  }

  if (!data) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        Profile not found
      </div>
    )
  }

  const { posts } = data

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* PROFILE CARD */}
      <div className="mb-8 flex items-center justify-between rounded-xl border p-6">
        <div className="flex items-center gap-4">
          <img
            src={
              user?.avatarUrl ||
              "/avatar-placeholder.png"
            }
            alt={user?.name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {user?.name}
            </h2>
            <p className="text-sm text-gray-500">
              {user?.headline ||
                "Frontend Developer"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpenEdit(true)}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit Profile
        </button>
      </div>

      {/* TABS */}
      <div className="mb-6 flex items-center gap-8 border-b">
        <button
          onClick={() => setActiveTab("posts")}
          className={`pb-3 text-sm font-medium ${
            activeTab === "posts"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Your Post
        </button>

        <button
          onClick={() => setActiveTab("password")}
          className={`pb-3 text-sm font-medium ${
            activeTab === "password"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Change Password
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "posts" && (
        <>
          {/* HEADER */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {posts.total} Post
            </h3>

            <button
              onClick={() =>
                router.push("/blogs/write")
              }
              className="
                w-[182px]
                h-[44px]
                p-2
                gap-2
                rounded-full
                flex
                items-center
                justify-center
                bg-blue-600
                text-white
                text-sm
                font-semibold
                hover:bg-blue-700
                transition
              "
            >
              ✏️ Write Post
            </button>
          </div>

          {/* POST LIST */}
          <div className="space-y-6">
            {posts.data.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                showActions
              />
            ))}
          </div>
        </>
      )}

      {activeTab === "password" && (
        <ChangePasswordForm />
      )}

      {/* EDIT PROFILE MODAL */}
      <EditProfileModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
    </div>
  )
}
