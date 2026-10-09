## 2025-02-15 - N+1 Queries on Hidden Modals
**Learning:** Modals inside list components (like `BlogCard`) can cause massive N+1 API requests on page load if their internal data-fetching (like `useQuery`) doesn't explicitly check if the modal is open.
**Action:** Always include `open` (or equivalent visibility state) in the `enabled` condition of `useQuery` for modals, rather than conditionally rendering the modal wrapper which can break exit animations.
