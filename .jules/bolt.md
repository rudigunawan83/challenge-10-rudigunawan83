## 2024-05-24 - Modals rendering in lists cause N+1 API requests
**Learning:** Rendering modals unconditionally inside mapped list items (like `BlogCard`) not only inflates the DOM size by mounting N instances of the modal, but if the modal contains data fetching hooks (like `useQuery`) that don't check the modal's `isOpen` state, it triggers an N+1 API request storm on page load.
**Action:** Always conditionally render modals in lists (`{isOpen && <Modal />}`) and ensure any internal data fetching requires `enabled: isOpen`.
