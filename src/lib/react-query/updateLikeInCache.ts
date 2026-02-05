import type { QueryClient } from "@tanstack/react-query"
import type { BlogPost } from "@/types/blog"

type ProfileQuery = {
  posts: {
    data: BlogPost[]
  }
}

type PostStatistic = {
  likes: number
  comments: number
  likedByMe: boolean
}

export function updateLikeInCache(
  queryClient: QueryClient,
  postId: number
) {
  /* ===== PROFILE LIST ===== */
  queryClient.setQueryData<ProfileQuery>(
    ["posts", "profile"],
    (old) => {
      if (!old) return old

      return {
        ...old,
        posts: {
          ...old.posts,
          data: old.posts.data.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  likedByMe: !p.likedByMe,
                  likes: p.likedByMe
                    ? p.likes - 1
                    : p.likes + 1,
                }
              : p
          ),
        },
      }
    }
  )

  /* ===== STATISTIC ===== */
  queryClient.setQueryData<PostStatistic>(
    ["posts", "statistic", postId],
    (old) => {
      if (!old) return old

      return {
        ...old,
        likedByMe: !old.likedByMe,
        likes: old.likedByMe
          ? old.likes - 1
          : old.likes + 1,
      }
    }
  )
}
