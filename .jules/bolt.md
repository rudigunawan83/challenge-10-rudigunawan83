## 2024-06-25 - Prevent N+1 Requests in Modals
**Learning:** Components rendered in lists, like Modals, that use data-fetching hooks internally (e.g., `useQuery`) will eagerly fetch data on mount for all instances if not properly constrained, leading to severe N+1 request performance bottlenecks.
**Action:** When working with Modals or other hidden components that fetch their own data, ensure the data-fetching is strictly constrained to execute only when the component is open (`enabled: isOpen && ...`).
