## 2025-05-18 - XSS in SSR
**Vulnerability:** Use of `dangerouslySetInnerHTML` on `post.content` without proper sanitization in `src/app/blogs/[id]/page.tsx`.
**Learning:** In Next.js SSR apps, `dangerouslySetInnerHTML` must be protected by an isomorphic HTML sanitizer like `isomorphic-dompurify`.
**Prevention:** Always ensure any user-controlled content passed to `dangerouslySetInnerHTML` is sanitized, and wrap it using `isomorphic-dompurify` to avoid breaking SSR while safely neutralizing malicious code.
