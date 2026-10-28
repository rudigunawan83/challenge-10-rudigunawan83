## 2026-10-28 - [XSS Vulnerability in Blog Post Content]
**Vulnerability:** The application uses dangerouslySetInnerHTML to render blog post content without sanitization.
**Learning:** In Next.js (and React generally), dangerouslySetInnerHTML requires a robust HTML sanitization library to prevent cross-site scripting (XSS) vulnerabilities.
**Prevention:** Use isomorphic-dompurify or another sanitization library before passing content to dangerouslySetInnerHTML.
