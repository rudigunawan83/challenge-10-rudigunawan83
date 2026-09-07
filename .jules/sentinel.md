## 2025-09-07 - [XSS] Sanitize HTML with isomorphic-dompurify in Next.js SSR
**Vulnerability:** The Blog Detail Page (`src/app/blogs/[id]/page.tsx`) rendered user-supplied HTML directly via `dangerouslySetInnerHTML={{ __html: post.content }}`. This is a classic Cross-Site Scripting (XSS) vulnerability.
**Learning:** `dangerouslySetInnerHTML` is extremely dangerous when displaying data from an untrusted source, like user-generated content from an API. Since this is a Next.js App Router application supporting Server-Side Rendering (SSR), standard DOMPurify won't work out-of-the-box on the server.
**Prevention:** In Next.js SSR contexts, always use `isomorphic-dompurify` to safely sanitize untrusted HTML on both the server and client sides before rendering it with `dangerouslySetInnerHTML`.
