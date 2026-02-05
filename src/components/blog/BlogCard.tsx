import { ThumbsUp, MessageCircle } from "lucide-react"
import dayjs from "dayjs"
import Link from "next/link"
import type { BlogPost } from "@/types/blog"

type Props = {
  post: BlogPost
}

export default function BlogCard({ post }: Props) {
  return (
    <Link href={`/blogs/${post.id}`}>
      <div className="flex cursor-pointer gap-6 border-b pb-6 transition hover:bg-gray-50">
        {/* IMAGE */}
        <img
          src={post.imageUrl || "/placeholder.jpg"}
          alt={post.title}
          className="h-40 w-60 rounded-lg object-cover"
        />

        {/* CONTENT */}
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {post.title}
          </h2>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border px-2 py-0.5 text-xs text-gray-600"
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
              <span className="font-medium text-gray-700">
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
        </div>
      </div>
    </Link>
  )
}
