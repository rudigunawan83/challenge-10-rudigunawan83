## 2024-11-12 - Hidden Modal N+1 Queries
**Learning:** Hidden modals rendered within lists (like `StatisticModal` in `BlogCard`) that contain internal `useQuery` hooks without checking their `open` state in the `enabled` configuration will trigger massive N+1 API requests on page load (one per list item), even if the modal eventually returns `null`.
**Action:** Always verify that internal data fetching inside hidden modals explicitly requires the modal to be open (`enabled: open && ...`), without conditionally rendering the modal wrapper itself, to prevent blocking potential exit animations.
