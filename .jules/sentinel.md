## 2025-02-21 - [XSS] Unsanitized HTML rendering via dangerouslySetInnerHTML
**Vulnerability:** XSS vulnerability found in blog post rendering where user-provided HTML string is injected directly via `dangerouslySetInnerHTML`.
**Learning:** In Next.js SSR apps, fixing XSS needs a library that works on both client and server; regular `dompurify` throws errors without window object, requiring `isomorphic-dompurify`.
**Prevention:** Avoid `dangerouslySetInnerHTML`. If necessary, always sanitize HTML using SSR-compatible libraries like `isomorphic-dompurify`.
