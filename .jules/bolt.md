## 2024-03-14 - [Preventing N+1 API Calls in Hidden Modals]
**Learning:** When modals containing `useQuery` hooks are rendered within a list (e.g., BlogCard list), they will execute all queries on mount, even if hidden, causing an N+1 API request bottleneck.
**Action:** Always include the modal visibility state (e.g., `open`) in the `enabled` configuration of the `useQuery` hook to prevent fetching until the modal is actually opened by the user.
