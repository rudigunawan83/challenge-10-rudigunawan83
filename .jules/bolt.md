## 2024-05-24 - [N+1 API Requests in Modals]
**Learning:** Hidden modals in lists (like `StatisticModal`) can cause massive N+1 API requests on page load if their internal data-fetching (like `useQuery`) doesn't explicitly check if the modal is open (`enabled: isOpen`).
**Action:** Always verify that components rendered in lists defer data fetching until they are actually visible or interacted with, especially when using React Query.
