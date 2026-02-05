"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getPostById, updatePost } from "@/lib/api"
import Button from "@/components/ui/button"

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const postId = Number(params.id)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [removeImage, setRemoveImage] =
    useState(false)

  /* =====================
     GET POST DETAIL
  ===================== */
  const { data, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
  })

  /* =====================
     PREFILL FORM
  ===================== */
  useEffect(() => {
    if (!data) return

    setTitle(data.title)
    setContent(data.content)
    setTags(data.tags)
    setPreview(data.imageUrl || null)
  }, [data])

  /* =====================
     UPDATE POST
  ===================== */
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      updatePost(postId, formData),
    onSuccess: () => {
      router.push(`/blogs/${postId}`)
    },
  })

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        Loading post...
      </div>
    )
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        Post not found
      </div>
    )
  }

  const handleSave = () => {
    const formData = new FormData()

    if (title !== data.title)
      formData.append("title", title)

    if (content !== data.content)
      formData.append("content", content)

    if (
      JSON.stringify(tags) !==
      JSON.stringify(data.tags)
    ) {
      formData.append("tags", JSON.stringify(tags))
    }

    if (image) {
      formData.append("image", image)
    }

    if (removeImage) {
      formData.append("removeImage", "true")
    }

    mutate(formData)
  }

  const handleAddTag = (value: string) => {
    if (!value.trim()) return
    if (tags.includes(value)) return
    setTags([...tags, value])
  }

  const handleRemoveTag = (value: string) => {
    setTags(tags.filter((t) => t !== value))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button
          onClick={() => router.back()}
          className="hover:underline"
        >
          ←
        </button>
        <span className="font-medium text-gray-800">
          Edit Post
        </span>
      </div>

      {/* TITLE */}
      <div className="mb-6">
        <label className="text-sm font-medium">
          Title
        </label>
        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="mt-1 w-full rounded-md border px-3 py-2"
        />
      </div>

      {/* CONTENT */}
      <div className="mb-6">
        <label className="text-sm font-medium">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="mt-1 min-h-[220px] w-full rounded-md border px-3 py-2"
        />
      </div>

      {/* COVER IMAGE */}
      <div className="mb-6">
        <label className="text-sm font-medium">
          Cover Image
        </label>

        <div className="mt-2 rounded-md border border-dashed p-4 text-center">
          {preview ? (
            <>
              <img
                src={preview}
                className="mx-auto mb-4 max-h-60 rounded-lg"
              />

              <div className="flex justify-center gap-4">
                <button
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="text-sm text-blue-600 hover:underline"
                >
                  ⬆ Change Image
                </button>

                <button
                  onClick={() => {
                    setPreview(null)
                    setImage(null)
                    setRemoveImage(true)
                  }}
                  className="text-sm text-red-600 hover:underline"
                >
                  🗑 Delete Image
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="text-sm text-blue-600 hover:underline"
            >
              Click to upload
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (!file) return
              setImage(file)
              setPreview(URL.createObjectURL(file))
              setRemoveImage(false)
            }}
          />

          <p className="mt-2 text-xs text-gray-500">
            PNG or JPG (max 5MB)
          </p>
        </div>
      </div>

      {/* TAGS */}
      <div className="mb-8">
        <label className="text-sm font-medium">
          Tags
        </label>

        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm"
            >
              {tag}
              <button
                onClick={() =>
                  handleRemoveTag(tag)
                }
              >
                ✕
              </button>
            </span>
          ))}

          <input
            placeholder="Add tag"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddTag(
                  (e.target as HTMLInputElement)
                    .value
                )
                ;(
                  e.target as HTMLInputElement
                ).value = ""
              }
            }}
            className="rounded-md border px-3 py-1 text-sm"
          />
        </div>
      </div>

      {/* SAVE */}
     <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="
            w-[265px]
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
            disabled:opacity-50
          "
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>

    </div>
  )
}
