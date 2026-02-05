/**
 * Blog Types
 * 
 * TODO: Define types sesuai dengan response dari API
 * Contoh structure (sesuaikan dengan API response yang sebenarnya):
 */

// export interface BlogPost {
//   id: string;
//   title: string;
//   content: string;
//   author: string;
//   createdAt: string;
//   image?: string;
//   category?: string;
//   // ... tambahkan fields lainnya sesuai API
// }

// export interface BlogPostListResponse {
//   posts: BlogPost[];
//   total: number;
//   page: number;
//   // ... tambahkan fields lainnya
// }

// src/types/blog.ts

export type BlogPost = {
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
    username?: string
    email?: string
  }
}


export type PaginatedResponse<T> = {
  data: T[]
  page: number
  lastPage: number
  total: number
}
