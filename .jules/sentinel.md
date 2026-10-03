## 2026-10-03 - [Cross-Site Scripting (XSS) in dangerouslySetInnerHTML]
**Vulnerability:** XSS vulnerability found in blog post detail view due to direct use of unsanitized HTML in `dangerouslySetInnerHTML`.
**Learning:** Rendering user-generated HTML directly can allow malicious scripts to be executed on the client side.
**Prevention:** Always sanitize user-generated HTML content before injecting it into the DOM using `dangerouslySetInnerHTML`. In Next.js environments, use `isomorphic-dompurify` to safely sanitize HTML on both server and client without hydration errors.
