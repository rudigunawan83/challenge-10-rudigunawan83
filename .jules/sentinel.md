## 2024-08-01 - XSS in dangerouslySetInnerHTML
**Vulnerability:** Found an XSS vulnerability in `src/app/blogs/[id]/page.tsx` where user-generated HTML content was rendered directly using `dangerouslySetInnerHTML={{ __html: post.content }}` without sanitization.
**Learning:** In Next.js/React, `dangerouslySetInnerHTML` is extremely risky if the content originates from users or an external API and is not sanitized. It can allow execution of malicious scripts.
**Prevention:** Always sanitize any untrusted HTML before rendering it with `dangerouslySetInnerHTML`. Using libraries like `isomorphic-dompurify` ensures the content is safe both on the client and server side.
