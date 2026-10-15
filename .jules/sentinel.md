## 2023-10-27 - SSR XSS Vulnerability
**Vulnerability:** Unsanitized HTML rendering via `dangerouslySetInnerHTML` in the blog detail view.
**Learning:** In Next.js SSR apps, `dangerouslySetInnerHTML` without proper server-compatible sanitization leads to XSS. Standard `dompurify` can cause build/hydration issues.
**Prevention:** Always use `isomorphic-dompurify` for sanitizing user-generated content in `dangerouslySetInnerHTML` within Next.js apps.
