## 2024-05-24 - N+1 Queries in Hidden Modals
**Learning:** Hidden modals in lists can cause N+1 queries if `useQuery` isn't gated by `isOpen`. Furthermore, conditionally rendering the modal wrapper itself should be avoided because it breaks exit animations.
**Action:** Always include `open` or `isOpen` in the `enabled` array for `useQuery` inside modal components that are rendered within lists.
