## 2024-05-24 - Prevent N+1 API requests from hidden modals in lists
**Learning:** Components using hidden modals in list renders can trigger massive N+1 API calls if their internal `useQuery` or `useEffect` hooks do not explicitly check the `open` state. Conditional rendering of the modal wrapper (`{isOpen && <Modal />}`) can break exit animations.
**Action:** Always include the modal's `open` prop in the `enabled` condition of data-fetching hooks (e.g., `enabled: !!postId && open`) when optimizing hidden modals in lists, rather than conditionally rendering the modal itself.
