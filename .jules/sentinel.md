## 2025-02-14 - SSR-Safe HTML Sanitization
**Vulnerability:** XSS via dangerouslySetInnerHTML on blog post content.
**Learning:** In Next.js App Router/SSR applications, traditional DOMPurify fails because the window object is not available on the server.
**Prevention:** Always use isomorphic-dompurify when sanitizing user-generated HTML in SSR environments to ensure XSS protection works securely on both server and client without build errors.
