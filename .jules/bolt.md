## 2025-03-09 - [N+1 API Requests in Hidden Modals]
**Learning:** Components containing `useQuery` hooks without relying on an `open` prop in the `enabled` configuration will trigger an API request for each component rendered, causing massive N+1 request issues on list pages (e.g. `StatisticModal.tsx` being rendered per post).
**Action:** Always conditionally `enable` React Query requests based on the modal's active state (e.g., `enabled: open && ...`) instead of conditionally rendering the modal component itself, as the latter breaks UI exit animations.
