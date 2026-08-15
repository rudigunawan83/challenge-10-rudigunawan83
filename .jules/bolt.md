## 2024-05-20 - N+1 API Requests from Hidden Modals
**Learning:** In lists rendering items with hidden modals, if a modal uses `useQuery` internally without checking its `open` state, it triggers a fetch for every item on page load, causing a massive N+1 bottleneck.
**Action:** Always include the modal's `open` (or `isOpen`) prop in the `enabled` condition of any internal data-fetching hooks (e.g., `enabled: open && !!id`). Do not conditionally render the modal component itself as it breaks exit animations.
