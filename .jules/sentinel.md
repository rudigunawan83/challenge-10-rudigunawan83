## 2025-05-24 - XSS Vulnerability in dangerouslySetInnerHTML
**Vulnerability:** User-generated blog content was directly rendered using `dangerouslySetInnerHTML` without any sanitization in `src/app/blogs/[id]/page.tsx`.
**Learning:** In Next.js SSR apps, `dangerouslySetInnerHTML` combined with unsanitized user content allows XSS. Standard `dompurify` can cause hydration mismatch errors; `isomorphic-dompurify` is required.
**Prevention:** Always use `isomorphic-dompurify` to sanitize user-generated HTML payloads before passing them to `dangerouslySetInnerHTML`.
