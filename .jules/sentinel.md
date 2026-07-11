## 2025-05-18 - XSS via dangerouslySetInnerHTML
**Vulnerability:** XSS vulnerability found in blog post details page where `post.content` is passed directly to `dangerouslySetInnerHTML` without sanitization.
**Learning:** `dangerouslySetInnerHTML` allows executing malicious scripts if the input contains malicious payloads (e.g., `<script>` tags). In a Next.js App Router context, `isomorphic-dompurify` provides a safe way to sanitize HTML without causing hydration errors or build breakages.
**Prevention:** Always sanitize user-generated HTML content before rendering it using `dangerouslySetInnerHTML`. Use libraries like `isomorphic-dompurify` to clean the HTML input.
