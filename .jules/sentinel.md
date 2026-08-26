## 2025-05-24 - Cross-Site Scripting (XSS) in dangerouslySetInnerHTML
**Vulnerability:** Found unescaped user input (post.content) passed directly to dangerouslySetInnerHTML in the blog detail page.
**Learning:** Next.js Server Components and SSR frameworks can still suffer from XSS if raw HTML is rendered without sanitization. The use of isomorphic-dompurify is necessary as it runs on both client and server safely.
**Prevention:** Always sanitize any untrusted HTML using a library like DOMPurify or isomorphic-dompurify before passing it to dangerouslySetInnerHTML.
