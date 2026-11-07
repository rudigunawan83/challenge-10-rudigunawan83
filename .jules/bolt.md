## 2024-05-24 - [Avoid N+1 API Requests in Hidden Modals]
**Learning:** When modals containing internal data fetching (`useQuery`) are rendered inside list items (like `BlogCard`), failing to include the modal's `open` state in the `enabled` condition causes massive N+1 API requests on page load.
**Action:** Always ensure that `useQuery` inside hidden modals explicitly checks `enabled: open && ...` to prevent unnecessary data fetching.
