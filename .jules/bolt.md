## 2024-05-24 - N+1 Queries from Hidden Modals in Lists
**Learning:** Hidden modals inside mapped lists (like `BlogCard`) can cause massive N+1 API requests on page load if their internal `useQuery` hooks fetch data without verifying the modal is actually open. Modifying the `enabled` option is better than conditional rendering (which breaks animations).
**Action:** Always add `open &&` (or equivalent prop) to the `enabled` option of data fetching hooks inside modal components, rather than conditionally rendering the modal wrapper.
