import { ThumbsUp, MessageCircle } from "lucide-react"
import { Post } from "@/lib/api"
import dayjs from "dayjs"

type Props = {
  post: Post
}

export default function BlogCard({ post }: Props) {
  return (
    <div className="flex gap-6 border-b pb-6">
      {/* IMAGE */}
      <img
        src={post.imageUrl}
        alt={post.title}
        className="h-40 w-60 rounded-lg object-cover"
      />

      {/* CONTENT */}
      <div className="flex flex-1 flex-col gap-2">
        <h2 className="text-lg font-semibold">
          {post.title}
        </h2>

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

        {/* CONTENT PREVIEW */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {post.content.replace(/<[^>]*>?/gm, "")}
        </p>

        {/* FOOTER */}
        <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-300" />
            {post.author.name} ·{" "}
            {dayjs(post.createdAt).format("DD MMM YYYY")}
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
  )
}
