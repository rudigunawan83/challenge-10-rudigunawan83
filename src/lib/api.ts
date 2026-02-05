/**
 * API Utility
 * Helper functions untuk fetch data dari backend API
 */

import type { BlogPost, PaginatedResponse } from "@/types/blog"

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
}

/* =====================================================
   SAFE FETCH HELPER
===================================================== */

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  })

  const text = await res.text()

  let data: any = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      throw new Error("Invalid server response")
    }
  }

  if (!res.ok) {
    throw new Error(
      data?.message || `API Error ${res.status}`
    )
  }

  return data
}

/* =====================================================
   AUTH
===================================================== */

export async function registerUser(payload: {
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

export async function loginUser(payload: {
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

export async function getRecommendedPosts(
  page = 1,
  limit = 10
): Promise<PaginatedResponse<BlogPost>> {
  return fetchAPI(
    `/posts/recommended?page=${page}&limit=${limit}`
  )
}

export async function getMostLikedPosts(
  page = 1,
  limit = 5
): Promise<PaginatedResponse<BlogPost>> {
  return fetchAPI(
    `/posts/most-liked?page=${page}&limit=${limit}`
  )
}

export async function searchPosts(
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
   USER PROFILE
===================================================== */

export type UserProfile = {
  id: number
  name: string
  email: string
  headline?: string
  avatarUrl?: string
}

export async function getProfile(): Promise<UserProfile> {
  const token = localStorage.getItem("access_token")
  if (!token) throw new Error("Unauthorized")

  return fetchAPI("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export type UserProfileWithPosts = {
  id: number
  name: string
  username: string
  headline?: string
  avatarUrl?: string
  posts: PaginatedResponse<BlogPost>
}

export async function getUserProfileByUsername(
  username: string,
  page = 1,
  limit = 10
): Promise<UserProfileWithPosts> {
  return fetchAPI(
    `/users/by-username/${username}?page=${page}&limit=${limit}`
  )
}

/* =====================================================
   POST DETAIL
===================================================== */

export type PostDetailResponse = {
  id: number
  title: string
  content: string
  tags: string[]
  imageUrl: string
  createdAt: string
  likes: number
  comments: number
  author: {
    id: number
    name: string
    email?: string
    headline?: string
    avatarUrl?: string   // ✅ FIX: avatar tersedia
  }
}

export async function getPostById(id: number) {
  return fetchAPI<PostDetailResponse>(
    `/posts/${id}`
  )
}

/* =====================================================
   POST LIKES
===================================================== */

export type PostLike = {
  id: number
  name: string
  headline: string
  avatarUrl: string
}

export async function getPostLikes(postId: number) {
  return fetchAPI<PostLike[]>(
    `/posts/${postId}/likes`
  )
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

export function getPostComments(postId: number) {
  return fetchAPI<Comment[]>(
    `/posts/${postId}/comments`
  )
}

export async function createComment(
  postId: number,
  content: string
) {
  const token = localStorage.getItem("access_token")
  if (!token) throw new Error("Unauthorized")

  return fetchAPI(
    `/comments/${postId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    }
  )
}
