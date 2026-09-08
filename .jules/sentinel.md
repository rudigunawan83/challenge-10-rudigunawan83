## 2024-05-24 - Cross-Site Scripting (XSS) in Blog Detail
**Vulnerability:** Unsanitized user content rendered with `dangerouslySetInnerHTML` in `src/app/blogs/[id]/page.tsx`
**Learning:** Stored XSS possible via blog post content
**Prevention:** Use `isomorphic-dompurify` to sanitize HTML before rendering with `dangerouslySetInnerHTML`.
