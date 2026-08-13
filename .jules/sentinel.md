## 2025-02-14 - Fix Cross-Site Scripting (XSS) in Blog Details
**Vulnerability:** Blog content was rendered using `dangerouslySetInnerHTML` without any HTML sanitization, exposing the application to XSS attacks if a malicious payload were saved in the post content.
**Learning:** In Next.js applications using Server-Side Rendering (SSR), standard DOMPurify can crash because it requires a browser DOM environment.
**Prevention:** Use `isomorphic-dompurify` in React/Next.js applications to safely sanitize user-generated HTML content before injecting it into the DOM, ensuring compatibility with both server and client environments.
