
## 2024-05-18 - Massive N+1 API Request Anti-Pattern in Modals
**Learning:** Rendering hidden modal components inside list items (like a blog feed) without conditional rendering or `enabled: isOpen` logic for internal `useQuery` hooks causes a massive N+1 API request anti-pattern. If a list has 100 items, and each item's hidden modal automatically fetches statistic data, it will trigger 100 unnecessary API requests on page load.
**Action:** Always conditionally render modals inside lists (`{isOpen && <Modal />}`) to minimize DOM size. Additionally, strictly verify that any internal data-fetching (like `useQuery`) within modals uses `enabled: !!isOpen` to prevent fetching data until the modal is actually opened.
