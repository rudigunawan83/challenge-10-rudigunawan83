## 2026-08-07 - Prevent N+1 query loops from hidden modal React Query hooks
**Learning:** Components using React Query hooks that are mounted but visibly hidden (e.g., Modals in a mapped list) still trigger data fetches unless correctly configured, causing massive N+1 API requests on initial render.
**Action:** Always conditionally disable `useQuery` hooks in potentially hidden wrapper components by including an `open` or `visible` prop in the `enabled` condition.
