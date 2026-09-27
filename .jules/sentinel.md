## 2025-02-14 - Fix Stored XSS in Blog Post Content
**Vulnerability:** Unsanitized user-generated content (`post.content`) was being directly rendered using `dangerouslySetInnerHTML` in `src/app/blogs/[id]/page.tsx`, leading to a Stored Cross-Site Scripting (XSS) vulnerability.
**Learning:** React's `dangerouslySetInnerHTML` provides no built-in sanitization. Any HTML content fetched from the API must be sanitized on the client side before rendering, even if the API is assumed to be safe.
**Prevention:** Always use a sanitization library like `isomorphic-dompurify` to clean HTML strings before passing them to `dangerouslySetInnerHTML`.
