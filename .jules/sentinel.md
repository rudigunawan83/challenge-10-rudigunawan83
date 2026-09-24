## 2025-02-27 - XSS Vulnerability in Blog Content Rendering
**Vulnerability:** Found `dangerouslySetInnerHTML` being used directly with user-supplied blog content (`post.content`) without any sanitization in `src/app/blogs/[id]/page.tsx`.
**Learning:** React's `dangerouslySetInnerHTML` is explicitly named to warn about XSS risks, but developers often use it for rich text without realizing that any script tags or malicious event handlers inside the HTML string will be executed.
**Prevention:** Always use a well-maintained DOM sanitization library like `isomorphic-dompurify` (for SSR compatibility) before rendering untrusted HTML strings in React applications.
