## 2026-07-16 - Prevent N+1 API Requests in List Modals
**Learning:** Modals rendered unconditionally within list components (like `BlogCard`) execute their hooks even when hidden (`open=false`), leading to massive N+1 API requests on page load (e.g., fetching likes for every post unconditionally).
**Action:** Always conditionally render modals in lists (`{isOpen && <Modal />}`) and ensure internal `useQuery` hooks have `enabled: isOpen` to prevent eager fetching.
