## 2023-10-27 - Prevent N+1 query in hidden UI
**Learning:** In list views containing modals (like ), fetching data via  without restricting execution to modal visibility () triggers N+1 requests on page load (one per list item). This significantly bottlenecks performance on the frontend and overloads the backend.
**Action:** When rendering hidden UI components for list items, always verify that their internal data fetching hooks strictly condition execution on the component's visibility state.
## 2026-02-05 - Prevent N+1 query in hidden UI
**Learning:** In list views containing modals (like `StatisticModal`), fetching data via `useQuery` without restricting execution to modal visibility (`enabled: open`) triggers N+1 requests on page load (one per list item). This significantly bottlenecks performance on the frontend and overloads the backend.
**Action:** When rendering hidden UI components for list items, always verify that their internal data fetching hooks strictly condition execution on the component's visibility state.
