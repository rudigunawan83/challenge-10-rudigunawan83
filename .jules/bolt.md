## 2024-08-01 - Prevent N+1 API calls in Modals
**Learning:** Hidden modals mapped in long lists (like blog posts) will instantly trigger `useQuery` API requests for *every item* on mount, regardless of whether the user actually clicks to open them. This is a severe N+1 data-fetching bottleneck.
**Action:** Always conditionally `enabled` React Query API fetches in Modal components based on their `open`/`isOpen` boolean prop to lazy load data effectively.
