## 2025-02-14 - Isomorphic DOMPurify for SSR XSS Prevention
**Vulnerability:** XSS vulnerability in `src/app/blogs/[id]/page.tsx` where user-controlled `post.content` is rendered using `dangerouslySetInnerHTML`.
**Learning:** In Next.js App Router (SSR) environments, traditional DOMPurify can cause build failures or runtime errors because it relies on the browser DOM (which isn't available during server-side rendering). `isomorphic-dompurify` must be used instead to safely sanitize HTML on both the server and client.
**Prevention:** Always wrap `dangerouslySetInnerHTML` with `DOMPurify.sanitize()` using `isomorphic-dompurify` when rendering dynamic content in SSR applications like Next.js to prevent XSS without breaking the build.
