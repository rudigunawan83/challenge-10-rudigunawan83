## 2023-10-24 - Safely sanitizing HTML in SSR Contexts
**Vulnerability:** XSS Vulnerability in Server-Side Rendering (SSR) context due to use of `dangerouslySetInnerHTML` with unsanitized user content.
**Learning:** `dangerouslySetInnerHTML` without proper sanitization allows attackers to inject malicious scripts. Using `dompurify` directly in a Next.js environment (SSR) can lead to build errors due to the lack of a window object. We must use `isomorphic-dompurify` to prevent XSS vulnerabilities in Next.js without breaking the build.
**Prevention:** Always sanitize user-generated HTML content before rendering it using `dangerouslySetInnerHTML`. Use `isomorphic-dompurify` in Next.js applications to ensure compatibility with SSR.
