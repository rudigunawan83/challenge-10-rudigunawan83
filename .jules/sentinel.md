
## 2025-02-15 - Fixed XSS vulnerability in dangerouslySetInnerHTML
**Vulnerability:** A Cross-Site Scripting (XSS) vulnerability was found in the `src/app/blogs/[id]/page.tsx` file, where the `dangerouslySetInnerHTML` prop in a React component was using user-provided content (`post.content`) without proper sanitization.
**Learning:** `dangerouslySetInnerHTML` passes unsanitized markup straight into the DOM. By default, Next.js doesn't perform HTML sanitization on raw HTML. It existed because the blog content could be authored by any user and is rendered dynamically without input sanitization on the client.
**Prevention:** In React and Next.js, always use a robust HTML sanitization library, such as `isomorphic-dompurify` (which works on both client and server), on user-generated inputs that are passed to `dangerouslySetInnerHTML`.
