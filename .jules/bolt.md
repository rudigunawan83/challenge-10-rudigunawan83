## 2024-08-01 - Prevent N+1 API Queries on hidden modals in lists
**Learning:** Components that utilize `useQuery` for fetching data can cause massive N+1 API requests on page load if rendered inside a list (like `StatisticModal` within `BlogCard`), even if hidden.
**Action:** When optimizing hidden modals, do not conditionally render the modal wrapper as it can break UI exit animations; instead add `open` to the `enabled` configuration of the internal data fetching query so that data is only fetched when the modal is opened.
