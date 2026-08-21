## 2023-10-25 - React Query hidden modal eager fetching
**Learning:** Components that return `null` when a prop (like `open`) is false still execute their hooks (e.g. `useQuery`) before the early return, causing eager data fetching.
**Action:** When using `useQuery` inside a modal component that is rendered hidden (e.g. for every item in a list), ALWAYS include the `open` state in the `enabled` configuration to prevent massive unnecessary API calls on page load.
