## 2025-02-14 - XSS in dangerouslySetInnerHTML
**Vulnerability:** Found a Cross-Site Scripting (XSS) vulnerability in `src/app/blogs/[id]/page.tsx` where blog post content from an external source was directly rendered into the DOM using `dangerouslySetInnerHTML={{ __html: post.content }}`.
**Learning:** React's `dangerouslySetInnerHTML` bypasses React's built-in XSS protection (escaping). Any un-sanitized content rendered this way can execute malicious scripts if injected by a user into the database or API.
**Prevention:** Always sanitize dynamic HTML content from untrusted sources before passing it to `dangerouslySetInnerHTML`. In Next.js (especially during SSR), the `isomorphic-dompurify` package is recommended to safely sanitize HTML on both server and client side.
