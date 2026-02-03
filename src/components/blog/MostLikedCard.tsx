import { ThumbsUp, MessageCircle } from "lucide-react"
import { MostLikedPost } from "@/lib/api"
import dayjs from "dayjs"

type Props = {
  post: MostLikedPost
}

export default function MostLikedCard({ post }: Props) {
  return (
    <div className="border-b pb-4">
      <h3 className="font-semibold line-clamp-2">
        {post.title}
      </h3>

      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
        {post.content}
      </p>

      <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
        <span className="text-xs">
          {dayjs(post.createdAt).format("DD MMM YYYY")}
        </span>

        <div className="flex items-center gap-1">
          <ThumbsUp size={14} /> {post.likes}
        </div>

        <div className="flex items-center gap-1">
          <MessageCircle size={14} /> {post.comments}
        </div>
      </div>
    </div>
  )
}
