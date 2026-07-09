## 2024-07-09 - N+1 Query in React Query Modals
**Learning:** Hidden components (like modals returning `null` when closed) still run their hooks. If a query is enabled without checking the `open` state, it will fire for every instance of the component in a list, causing severe N+1 request issues.
**Action:** Always include the `open` or `isVisible` state in the `enabled` condition of `useQuery` inside modal or popover components that are rendered in lists.
