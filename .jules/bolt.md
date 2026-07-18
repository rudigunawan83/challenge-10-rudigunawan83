## 2025-02-18 - [Prevent N+1 API Calls and Excessive DOM Nodes in Lists]
**Learning:** Rendering modals unconditionally inside mapped lists (like `BlogCard`) can cause massive N+1 API calls on page load if the modal contains active data-fetching queries, and it excessively bloats the DOM.
**Action:** Always conditionally render modals (`{isOpen && <Modal />}`) inside lists and ensure internal `useQuery` hooks are only `enabled` when the modal is explicitly open.
