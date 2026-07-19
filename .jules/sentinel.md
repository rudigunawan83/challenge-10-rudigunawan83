## 2026-07-19 - Unsanitized HTML rendering via dangerouslySetInnerHTML
**Vulnerability:** XSS (Cross-Site Scripting) vulnerability discovered where user-generated content (blog posts) was being rendered directly into the DOM using `dangerouslySetInnerHTML` without proper sanitization.
**Learning:** In Next.js SSR apps, `dangerouslySetInnerHTML` can easily become an XSS vector if raw data from a database or API is passed directly to it. Using standard DOM manipulation libraries can cause SSR errors.
**Prevention:** Always use a library like `isomorphic-dompurify` to safely sanitize HTML content before passing it to `dangerouslySetInnerHTML` to prevent XSS attacks while maintaining SSR compatibility.
