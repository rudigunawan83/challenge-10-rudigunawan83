## 2025-08-04 - Hidden Modal Data Fetching N+1 Issue
**Learning:** Hidden modals rendered within lists that unconditionally fetch data (like using `useQuery` without depending on the `isOpen` prop) can cause massive N+1 API requests on page load, severely degrading performance.
**Action:** Always ensure that data fetching hooks (e.g., `useQuery`) inside modal components use the modal's `open` prop in their `enabled` condition (`enabled: isOpen && ...`) rather than conditionally rendering the entire modal wrapper, which can break exit animations.
