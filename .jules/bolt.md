## 2025-02-18 - Optimize StatisticModal API calls

**Learning:** When modals containing `useQuery` hooks are hidden but not conditionally rendered (e.g. they are always mounted in a list of items), the API calls inside those hooks will still execute on page load, causing massive N+1 query problems.
**Action:** Always add the `open` (or `isOpen`) prop to the `enabled` condition of data-fetching hooks inside hidden UI components (e.g. `enabled: open && ...`) instead of conditionally rendering the modal wrapper, which can break CSS/UI exit animations.
