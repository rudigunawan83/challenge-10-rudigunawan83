## 2025-02-23 - SSR XSS Sanitization
**Vulnerability:** Unsanitized HTML rendering via dangerouslySetInnerHTML in Next.js SSR context.
**Learning:** Next.js Server Components and SSR require isomorphic sanitizers (like isomorphic-dompurify) because standard DOM-based sanitizers may break during server-side rendering.
**Prevention:** Always wrap dangerouslySetInnerHTML data from APIs using isomorphic-dompurify in Next.js apps.
