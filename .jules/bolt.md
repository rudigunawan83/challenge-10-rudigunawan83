## 2024-11-06 - Hidden Modal Data Fetching
**Learning:** In list views where modals are pre-rendered for each item but hidden by default, ensuring internal data fetching hooks (like `useQuery`) are only `enabled` when the modal is `open` prevents massive N+1 API requests on page load. Conditionally rendering the modal wrapper itself is not always possible as it may break exit animations relying on the `open` prop.
**Action:** Always check `enabled` options for data fetching inside hidden modals to ensure they require the `open` state.
