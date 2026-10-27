## 2025-02-18 - Prevent N+1 API Requests in Hidden Modals
**Learning:** In React/Next.js lists where a hidden modal containing `useQuery` hooks is rendered for each item, the `useQuery` fetches data on page load regardless of the modal visibility if not properly disabled. This leads to massive N+1 background API requests.
**Action:** Always ensure that `useQuery` hooks inside hidden modals explicitly check for the `open` state in their `enabled` configuration (e.g., `enabled: open && !!id`) to prevent unnecessary fetching until the modal is opened.
