## 2025-01-01 - XSS Vulnerability in Blog Content
**Vulnerability:** The application renders user-supplied blog content using `dangerouslySetInnerHTML` without any sanitization.
**Learning:** In Next.js App Router applications, rendering un-sanitized content via `dangerouslySetInnerHTML` poses a severe Cross-Site Scripting (XSS) risk.
**Prevention:** Always use a robust isomorphic sanitizer such as `isomorphic-dompurify` to sanitize user-supplied HTML before rendering it in SSR contexts.
