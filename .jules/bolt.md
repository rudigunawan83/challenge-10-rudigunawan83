## 2025-02-12 - Fix N+1 queries in Next.js List Modals
**Learning:** When using `@tanstack/react-query` inside modals rendered within a mapped list (like `BlogCard`), failing to make the `enabled` configuration conditional upon the modal being `open` causes massive N+1 eager API fetching problems on page load.
**Action:** Always include an explicit `open && ...` check inside the `enabled` property of any `useQuery` hooks used in hidden list modals to ensure queries execute only upon user interaction.
