## 2023-10-25 - Prevent N+1 queries from hidden modals
**Learning:** Hidden modals rendered within lists or list items that have active data-fetching (like `useQuery`) can trigger massive N+1 API requests on page load if the fetch condition does not explicitly check if the modal is open.
**Action:** When optimizing hidden modals in lists, do NOT conditionally render the modal wrapper as it can break UI exit animations. Instead, prevent the requests by ensuring internal data-fetching explicitly requires the modal to be open (e.g., `enabled: open && !!id`).
