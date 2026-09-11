## 2026-09-11 - [Fix XSS Vulnerability in Blog Post Content]
**Vulnerability:** User-generated blog content was directly rendered using `dangerouslySetInnerHTML` in `src/app/blogs/[id]/page.tsx` without sanitization.
**Learning:** `dangerouslySetInnerHTML` is commonly used to render rich text like blog posts but requires rigorous sanitization (like DOMPurify). In Next.js SSR apps, `isomorphic-dompurify` prevents node/browser mismatch errors during build and rendering.
**Prevention:** Always wrap `dangerouslySetInnerHTML` inputs with `DOMPurify.sanitize()` when handling user content in Next.js applications, and include `Suspense` around components utilizing `useSearchParams()`.
