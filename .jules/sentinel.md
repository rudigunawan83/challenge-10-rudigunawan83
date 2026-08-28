## 2024-05-15 - [XSS Vulnerability in Blog Detail Page]
**Vulnerability:** The blog detail page (`src/app/blogs/[id]/page.tsx`) rendered unsanitized blog post content using `dangerouslySetInnerHTML`.
**Learning:** Whenever rendering user-generated content (like blog posts or comments) using `dangerouslySetInnerHTML`, the application is at risk of Cross-Site Scripting (XSS) if the content is not sanitized. In SSR environments like Next.js, standard DOM manipulation libraries might not work safely, leading to the need for SSR-compatible tools.
**Prevention:** Always sanitize HTML strings using an SSR-compatible library like `isomorphic-dompurify` before passing them to `dangerouslySetInnerHTML`. Never blindly trust content from a database that originated from users.
