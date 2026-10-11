## 2024-10-11 - N+1 API Requests in Hidden Modals
**Learning:** Hidden modals mapped over lists (like inside a list of BlogCards) trigger N+1 API calls on initial page load if their data-fetching queries (e.g. `useQuery`) do not require the `open` prop to be true.
**Action:** When a modal is mapped in a list and manages its own data fetching, ALWAYS ensure internal queries conditionally fetch based on the `open` state, e.g. `enabled: open && !!id`.
