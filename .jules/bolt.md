
## 2023-10-23 - Prevent N+1 API Requests in Hidden Modals
**Learning:** In Next.js/React applications using `react-query`, rendering modals with internal data fetching inside map loops (like `BlogCard`) can cause massive N+1 API request issues on page load. Even if the modal returns `null` when closed (`if (!open) return null`), the hooks still execute. DO NOT conditionally render the modal wrapper (e.g. `{isOpen && <Modal/>}`) as it breaks UI exit animations that rely on the `open` prop.
**Action:** When optimizing hidden modals in lists, prevent N+1 API requests by verifying that any internal data-fetching (like `useQuery`) explicitly requires the modal to be open (`enabled: open && ...`).
