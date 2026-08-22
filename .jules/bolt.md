## 2024-08-22 - Prevent N+1 queries in hidden modals
**Learning:** Modals rendered inside list items (like `BlogCard`) can trigger massive N+1 API requests on page load if their internal data-fetching (like `useQuery`) is not explicitly gated by the modal's open state (`enabled: open`).
**Action:** When creating or optimizing modals with internal data fetching, always ensure the query is `enabled` ONLY when the modal is `open` to prevent unnecessary background requests.
