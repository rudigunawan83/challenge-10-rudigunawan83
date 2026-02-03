/**
 * API Utility
 *
 * Helper functions untuk fetch data dari backend API
 * Bisa di-extend untuk auth, blog, dll
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in environment variables"
  );
}

/**
 * Generic fetch function (GET)
 */
export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(
        errorData?.message ||
          `API Error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}

/* =====================================================
   AUTHENTICATION
===================================================== */

/**
 * Register User
 */
export async function registerUser(payload: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  return fetchAPI<{
    id: number;
    email: string;
    username: string;
  }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* =====================================================
   AUTHENTICATION
===================================================== */

/**
 * Login User
 */
export async function loginUser(payload: {
  email: string
  password: string
}) {
  return fetchAPI<{
    accessToken?: string
    token?: string
    user?: any
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

/* =====================================================
   POSTS
===================================================== */

export type Post = {
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
    username: string
    email: string
  }
}

export type RecommendedPostsResponse = {
  data: Post[]
  total: number
  page: number
  lastPage: number
}

/**
 * Get Recommended Posts
 * GET /posts/recommended?limit=10&page=1
 */
export async function getRecommendedPosts(
  page = 1,
  limit = 10
) {
  return fetchAPI<RecommendedPostsResponse>(
    `/posts/recommended?limit=${limit}&page=${page}`
  )
}

/* =====================================================
   POSTS - MOST LIKED
===================================================== */

export type MostLikedPost = {
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
    email: string
  }
}

export type MostLikedResponse = {
  data: MostLikedPost[]
  total: number
  page: number
  lastPage: number
}

/**
 * Get Most Liked Posts
 * GET /posts/most-liked?limit=5&page=1
 */
export async function getMostLikedPosts(
  page = 1,
  limit = 5
) {
  return fetchAPI<MostLikedResponse>(
    `/posts/most-liked?limit=${limit}&page=${page}`
  )
}

/* =====================================================
   POSTS - SEARCH
===================================================== */

export type SearchPostsResponse = {
  data: Post[]
  total: number
  page: number
  lastPage: number
}

/**
 * Search Posts
 * GET /posts/search?query=frontend&limit=10&page=1
 */
export async function searchPosts(
  query: string,
  page = 1,
  limit = 10
) {
  return fetchAPI<SearchPostsResponse>(
    `/posts/search?query=${encodeURIComponent(query)}&limit=${limit}&page=${page}`
  )
}
