## 2024-08-09 - Deferring data fetching for Modals in lists
**Learning:** I found that components used in lists (e.g. `StatisticModal` loaded via `BlogCard`) can cause many redundant API requests on load. Adding an `open` condition in `useQuery` `enabled` is much better than conditionally rendering the whole modal because it preserves the UI animations that rely on the `open` prop.
**Action:** Always check hooks that fetch data inside hidden components (modals, dropdowns) to make sure they are deferred until the user opens the component.
