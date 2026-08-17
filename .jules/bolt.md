## 2024-05-24 - N+1 Fetching in Hidden Modals
**Learning:** Modals rendered within list items (like `StatisticModal` in `BlogCard`) that use `useQuery` without checking the `open` prop will execute their fetch requests on mount. This causes massive N+1 API requests on page load since the modal component mounts alongside the list item, even if it is visually hidden.
**Action:** Always include the `open` prop in the `enabled` condition of `useQuery` within modal components to ensure data is only fetched when the modal is actually opened.
