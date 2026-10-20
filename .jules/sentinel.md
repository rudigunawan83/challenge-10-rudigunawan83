## 2025-02-23 - Cross-Site Scripting (XSS) in dangerouslySetInnerHTML
**Vulnerability:** Unsanitized user content (`post.content`) was being rendered directly via `dangerouslySetInnerHTML`.
**Learning:** React's built-in protections are bypassed when using `dangerouslySetInnerHTML`. If the content is user-controlled (like blog posts), it's a vector for XSS.
**Prevention:** Always wrap variables passed to `dangerouslySetInnerHTML` with an HTML sanitizer. In Next.js (or SSR contexts), `isomorphic-dompurify` should be used to prevent both XSS and hydration mismatches.
