## 2025-02-23 - Prevent N+1 API calls on hidden Modals
**Learning:** Hidden Modals (`StatisticModal`) that are rendered for every item in a list (like `BlogCard`) can cause massive N+1 API requests on page load if their internal data-fetching (like `useQuery`) doesn't check if the modal is actually open.
**Action:** When working with hidden modals that fetch data, ensure the data fetching mechanism (e.g., `useQuery`'s `enabled` option) explicitly requires the modal's `open` state to be true. Do not conditionally render the modal wrapper itself, as it might break exit animations.
