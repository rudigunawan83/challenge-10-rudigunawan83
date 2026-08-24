## 2024-05-24 - Fixed XSS vulnerability with Server-Side Rendering support
**Vulnerability:** User generated content was being rendered unsanitized through dangerouslySetInnerHTML.
**Learning:** Using dompurify inside Next.js components can lead to crashes if rendered on the server due to lack of the `window` object.
**Prevention:** Use isomorphic-dompurify in Server-Side Rendering contexts, like Next.js apps, to prevent XSS without causing server side rendering errors.
