## 2025-05-18 - XSS Vulnerability in Blog Rendering
**Vulnerability:** User-generated blog content was being rendered directly via `dangerouslySetInnerHTML` without sanitization.
**Learning:** In Next.js applications, standard `dompurify` can cause SSR errors due to reliance on the `window` object.
**Prevention:** Use `isomorphic-dompurify` to safely sanitize HTML in Server-Side Rendering contexts before injection to prevent XSS.
