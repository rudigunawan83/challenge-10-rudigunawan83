/**
 * API Utility
 * Helper functions untuk fetch data dari backend API
 */

import type {
  BlogPost,
  PaginatedResponse,
} from "@/types/blog"

/* =====================================================
   BASE URL
===================================================== */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined"
  )
}

/* =====================================================
   RESPONSE PARSER
===================================================== */

async function parseResponse(res: Response) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    throw new Error("Invalid server response")
  }
}

/* =====================================================
   JSON FETCH
===================================================== */

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    }
  )

  const data = await parseResponse(res)

  if (!res.ok) {
    throw new Error(
      data?.message ||
        `API Error ${res.status}`
    )
  }

  return data
}

/* =====================================================
   MULTIPART FETCH
===================================================== */

export async function fetchMultipart<T>(
  endpoint: string,
  options: RequestInit
): Promise<T> {
  const res = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        ...(options.headers || {}),
      },
    }
  )

  const data = await parseResponse(res)

  if (!res.ok) {
    throw new Error(
      data?.message ||
        `API Error ${res.status}`
    )
  }

  return data
}

/* =====================================================
   AUTH
===================================================== */

export function registerUser(payload: {
  name: string
  username: string
  email: string
  password: string
}) {
  return fetchAPI("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function loginUser(payload: {
  email: string
  password: string
}) {
  return fetchAPI<{ token: string }>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  )
}

/* =====================================================
   POSTS (LIST)
===================================================== */

export function getRecommendedPosts(
  page = 1,
  limit = 10
): Promise<PaginatedResponse<BlogPost>> {
  return fetchAPI(
    `/posts/recommended?page=${page}&limit=${limit}`
  )
}

export function getMostLikedPosts(
  page = 1,
  limit = 5
): Promise<PaginatedResponse<BlogPost>> {
  return fetchAPI(
    `/posts/most-liked?page=${page}&limit=${limit}`
  )
}

export function searchPosts(
  query: string,
  page = 1,
  limit = 10
): Promise<PaginatedResponse<BlogPost>> {
  return fetchAPI(
    `/posts/search?query=${encodeURIComponent(
      query
    )}&page=${page}&limit=${limit}`
  )
}

/* =====================================================
   POSTS (CRUD)
===================================================== */

export function createPost(
  formData: FormData
): Promise<BlogPost> {
  const token = localStorage.getItem(
    "access_token"
  )
  if (!token)
    throw new Error("Unauthorized")

  return fetchMultipart("/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
}

export function updatePost(
  postId: number,
  formData: FormData
): Promise<{ id: number }> {
  const token = localStorage.getItem(
    "access_token"
  )
  if (!token)
    throw new Error("Unauthorized")

  return fetchMultipart(
    `/posts/${postId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  )
}

export function deletePost(
  postId: number
): Promise<{ success: boolean }> {
  const token = localStorage.getItem(
    "access_token"
  )
  if (!token)
    throw new Error("Unauthorized")

  return fetchAPI(`/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

/* =====================================================
   POST DETAIL (❗TIDAK DIUBAH)
===================================================== */

export function getPostById(
  id: number
): Promise<BlogPost> {
  return fetchAPI(`/posts/${id}`)
}

/* =====================================================
   PROFILE
===================================================== */

export type UserProfile = {
  id: number
  name: string
  username: string
  email: string
  headline?: string
  avatarUrl?: string
}

export type UserProfileWithPosts =
  UserProfile & {
    posts: PaginatedResponse<BlogPost>
  }

export function getProfile(): Promise<UserProfile> {
  const token = localStorage.getItem(
    "access_token"
  )
  if (!token)
    throw new Error("Unauthorized")

  return fetchAPI("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export function getUserProfileByUsername(
  username: string,
  page = 1,
  limit = 10
): Promise<UserProfileWithPosts> {
  return fetchAPI(
    `/users/by-username/${username}?page=${page}&limit=${limit}`
  )
}

export function updateProfile(
  formData: FormData
): Promise<UserProfile> {
  const token = localStorage.getItem(
    "access_token"
  )
  if (!token)
    throw new Error("Unauthorized")

  return fetchMultipart("/users/profile", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
}

/* =====================================================
   CHANGE PASSWORD
===================================================== */

export function changePassword(payload: {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}): Promise<{
  success: boolean
  message: string
}> {
  const token = localStorage.getItem(
    "access_token"
  )
  if (!token)
    throw new Error("Unauthorized")

  return fetchAPI("/users/password", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

/* =====================================================
   COMMENTS
===================================================== */

export type Comment = {
  id: number
  content: string
  createdAt: string
  author: {
    id: number
    name: string
    headline?: string
    avatarUrl?: string
  }
}

export function getPostComments(
  postId: number
): Promise<Comment[]> {
  return fetchAPI(
    `/posts/${postId}/comments`
  )
}

export function createComment(
  postId: number,
  content: string
) {
  const token = localStorage.getItem(
    "access_token"
  )
  if (!token)
    throw new Error("Unauthorized")

  return fetchAPI(`/comments/${postId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  })
}

/* =====================================================
   POST LIKE (STATISTIC)
===================================================== */

/**
 * GET list user yang like post
 * GET /posts/{id}/likes
 */
export type PostLikeUser = {
  id: number
  name: string
  headline: string
  avatarUrl: string
}

export function getPostLikes(
  postId: number
): Promise<PostLikeUser[]> {
  return fetchAPI(
    `/posts/${postId}/likes`
  )
}

/**
 * Like / Unlike post
 * POST /posts/{id}/like
 */
export function togglePostLike(
  postId: number
): Promise<{ liked: boolean }> {
  const token = localStorage.getItem(
    "access_token"
  )
  if (!token)
    throw new Error("Unauthorized")

  return fetchAPI(
    `/posts/${postId}/like`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
