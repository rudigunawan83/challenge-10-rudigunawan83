## 2025-07-29 - [Fix XSS Vulnerability]
**Vulnerability:** User-generated blog post content was directly injected into the DOM using dangerouslySetInnerHTML, leading to a critical XSS vulnerability.
**Learning:** Next.js applications using dangerouslySetInnerHTML with unsanitized user content are vulnerable to XSS.
**Prevention:** Use isomorphic-dompurify to sanitize user-generated HTML in Server-Side Rendering (SSR) contexts like Next.js App Router before passing it to dangerouslySetInnerHTML.
