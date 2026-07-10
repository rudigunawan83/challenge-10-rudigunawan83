## 2025-07-10 - [CRITICAL] Prevent XSS in SSR rendered HTML content
**Vulnerability:** Found un-sanitized user-supplied HTML content (`post.content`) being rendered using `dangerouslySetInnerHTML` in `src/app/blogs/[id]/page.tsx`. This causes a severe Cross-Site Scripting (XSS) vulnerability.
**Learning:** Next.js App router apps require special attention for SSR contexts when applying security mitigations for `dangerouslySetInnerHTML`. We must use `isomorphic-dompurify` to prevent CSR bailout and safely sanitize content on both server and client side.
**Prevention:** Always use `isomorphic-dompurify` to sanitize HTML content rendered with `dangerouslySetInnerHTML` in Next.js Server Components / SSR environment.
