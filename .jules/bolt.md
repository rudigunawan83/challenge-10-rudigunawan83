## 2024-11-05 - Hidden Modal N+1 API Requests
**Learning:** Rendering hidden modals that use `useQuery` without explicitly checking the `open` prop in the `enabled` condition causes massive N+1 API requests on page load (e.g. when rendered in a list).
**Action:** When creating hidden modals that fetch data using React Query, always include the modal's `open` prop in the `enabled` option (e.g., `enabled: open && !!id`) to prevent unnecessary fetching.
