## 2025-02-23 - XSS Vulnerability in Blog Content
**Vulnerability:** Unsanitized blog content injected directly into the DOM via dangerouslySetInnerHTML.
**Learning:** Using dangerouslySetInnerHTML with user-controlled content without proper sanitization leads to XSS vulnerabilities, especially in Server-Side Rendering (SSR) environments.
**Prevention:** Always wrap user-supplied HTML content in an isomorphic sanitizer like `isomorphic-dompurify` before injecting it via dangerouslySetInnerHTML.
