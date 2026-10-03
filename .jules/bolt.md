## 2025-02-14 - Prevent N+1 API requests in hidden Modals
**Learning:** Modals rendered within list items that fetch data on mount using `useQuery` will trigger massive N+1 API requests upon page load, even if the modal is hidden.
**Action:** Always include the modal's visibility state (e.g., `open`) in the `enabled` condition of `useQuery` inside the modal to prevent unnecessary background fetching.
