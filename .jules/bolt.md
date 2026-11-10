## 2024-05-24 - [Preventing N+1 API Requests in Hidden Modals]
**Learning:** Rendering hidden modals inside lists can trigger massive N+1 API requests on page load if their internal data-fetching (like `useQuery`) isn't conditioned on the modal's open state. Conditionally rendering the modal wrapper (e.g., `{isOpen && <Modal />}`) breaks UI exit animations relying on the `open` prop.
**Action:** Always include the modal's `open` state in the `enabled` condition of internal `useQuery` hooks (e.g., `enabled: open && ...`) rather than conditionally rendering the modal component itself.
