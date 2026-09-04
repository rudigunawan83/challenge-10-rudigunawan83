## 2024-05-18 - Pre-rendered Modals Causing N+1 API Requests
**Learning:** Pre-rendered modal components within lists (like `StatisticModal` inside `BlogCard`) can trigger massive N+1 API requests on page load if their internal data-fetching (like `useQuery`) doesn't conditionally require the modal to be open.
**Action:** When adding data fetching inside modal components that are mapped over in a list, always ensure the query's `enabled` condition strictly incorporates the modal's `open` state to defer the fetch until user interaction.
