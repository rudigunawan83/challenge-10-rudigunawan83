## 2025-02-18 - Optimized List Modals
**Learning:** Hidden modals in a list component using `useQuery` can cause an N+1 API request issue on initial load.
**Action:** Always add the `open` state variable to the `enabled` configuration of the `useQuery` options to ensure data is only fetched when the modal actually opens.
