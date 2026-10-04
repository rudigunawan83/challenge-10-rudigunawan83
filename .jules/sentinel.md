## 2025-02-12 - Prevent XSS in Blog Post Content
**Vulnerability:** Cross-Site Scripting (XSS) vulnerability due to unsanitized `post.content` being rendered using `dangerouslySetInnerHTML` in `src/app/blogs/[id]/page.tsx`.
**Learning:** `dangerouslySetInnerHTML` is inherently dangerous as it bypasses React's escaping mechanism. Unsanitized user content passed to this property allows an attacker to execute arbitrary scripts in a user's browser, posing a severe XSS risk.
**Prevention:** Always sanitize untrusted HTML input before rendering it using `dangerouslySetInnerHTML`. Use a robust HTML sanitizer, such as `DOMPurify` (or `isomorphic-dompurify` for SSR), to strip malicious tags and attributes from the content.
