## 2025-02-23 - [Critical XSS Vulnerability]
**Vulnerability:** Found a Cross-Site Scripting (XSS) vulnerability in `src/app/blogs/[id]/page.tsx` where user-controlled content (`post.content`) was passed directly to `dangerouslySetInnerHTML` without any sanitization.
**Learning:** React's `dangerouslySetInnerHTML` inherently exposes an application to XSS attacks if the input is not sanitized, especially when rendering user-generated content from an API. Server-side rendering (SSR) in Next.js requires an isomorphic HTML sanitizer to avoid hydration or SSR bailout errors.
**Prevention:** Always sanitize HTML strings using a robust isomorphic sanitizer like `isomorphic-dompurify` before passing them to `dangerouslySetInnerHTML`. Never trust user input, especially for rich text content.
