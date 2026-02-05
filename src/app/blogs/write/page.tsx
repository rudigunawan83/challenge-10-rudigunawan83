"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { createPost } from "@/lib/api"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Maximize
} from "lucide-react"

type Errors = {
  title?: string
  content?: string
  image?: string
  tags?: string
}

export default function WritePostPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      router.push(`/blogs/${data.id}`)
    },
  })

  /* =====================
     VALIDATION
  ===================== */
  const validate = (): Errors => {
    const newErrors: Errors = {}

    if (!title.trim()) newErrors.title = "Title is required"
    if (!content.trim()) newErrors.content = "Content is required"
    if (!image) newErrors.image = "Cover image is required"
    if (!tags.trim()) newErrors.tags = "Tags is required"

    return newErrors
  }

  const handleSubmit = () => {
    setSubmitted(true)
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    formData.append("image", image!)

    tags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean)
      .forEach(tag => {
        formData.append("tags[]", tag)
      })

    mutate(formData)
  }

  const handleImageChange = (file?: File) => {
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setErrors(prev => ({ ...prev, image: undefined }))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-8">
        Write Post
      </h1>

      {/* TITLE */}
      <div className="mb-6">
        <label className="text-sm font-medium">
          Title
        </label>
        <Input
          placeholder="Enter your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={
            submitted && errors.title
              ? "border-red-500 focus:ring-red-500"
              : ""
          }
        />
        {submitted && errors.title && (
          <p className="mt-1 text-xs text-red-500">
            {errors.title}
          </p>
        )}
      </div>

      {/* CONTENT */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-1 block">
          Content
        </label>

        <div
          className={`rounded-md border ${
            submitted && errors.content
              ? "border-red-500"
              : "border-gray-300"
          }`}
        >
          {/* Toolbar */}
          <div className="flex items-center gap-3 border-b px-3 py-2">
            <select className="text-sm border rounded px-2 py-1">
              <option>Heading 1</option>
              <option>Heading 2</option>
              <option>Paragraph</option>
            </select>

            <Bold size={16} />
            <Strikethrough size={16} />
            <Italic size={16} />
            <List size={16} />
            <ListOrdered size={16} />
            <LinkIcon size={16} />
            <ImageIcon size={16} />
            <Maximize size={16} className="ml-auto" />
          </div>

          <textarea
            className="w-full min-h-[240px] px-4 py-3 focus:outline-none"
            placeholder="Enter your content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {submitted && errors.content && (
          <p className="mt-1 text-xs text-red-500">
            {errors.content}
          </p>
        )}
      </div>

      {/* COVER IMAGE */}
      <div className="mb-6">
        <label className="text-sm font-medium block mb-1">
          Cover Image
        </label>

        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            handleImageChange(e.dataTransfer.files[0])
          }}
          className={`cursor-pointer rounded-md border-2 border-dashed px-6 py-10 text-center ${
            submitted && errors.image
              ? "border-red-500"
              : "border-gray-300"
          }`}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-64 rounded-md object-cover"
            />
          ) : (
            <>
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border">
                <ImageIcon size={18} />
              </div>
              <p className="text-sm">
                <span className="text-blue-600 font-medium">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="mt-1 text-xs text-gray-500">
                PNG or JPG (max. 5mb)
              </p>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            hidden
            onChange={(e) =>
              handleImageChange(e.target.files?.[0])
            }
          />
        </div>

        {submitted && errors.image && (
          <p className="mt-1 text-xs text-red-500">
            {errors.image}
          </p>
        )}
      </div>

      {/* TAGS */}
      <div className="mb-10">
        <label className="text-sm font-medium">
          Tags
        </label>
        <Input
          placeholder="Enter your tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className={
            submitted && errors.tags
              ? "border-red-500 focus:ring-red-500"
              : ""
          }
        />
        {submitted && errors.tags && (
          <p className="mt-1 text-xs text-red-500">
            {errors.tags}
          </p>
        )}
      </div>

     {/* FINISH BUTTON */}
        <div className="flex justify-end">
        <button
            onClick={handleSubmit}
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
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
            "
        >
            {isPending ? "Saving..." : "Finish"}
        </button>
        </div>

    </div>
  )
}
