## 2023-10-27 - [XSS via dangerouslySetInnerHTML in Blog Post Rendering]
**Vulnerability:** User-provided HTML content was rendered directly using `dangerouslySetInnerHTML={{ __html: post.content }}` without sanitization, leading to a Cross-Site Scripting (XSS) vulnerability.
**Learning:** `dangerouslySetInnerHTML` must always be paired with a sanitization library like DOMPurify when handling user-generated content.
**Prevention:** Always use `isomorphic-dompurify` (for SSR compatibility) to sanitize HTML before injecting it with `dangerouslySetInnerHTML`.
