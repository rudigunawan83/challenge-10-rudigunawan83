## 2026-08-03 - [N+1 Query Bottleneck from Hidden Modals in Lists]
**Learning:** In Next.js/React Query applications, rendering modals inside list components (like `BlogCard`) can cause massive N+1 API requests on page load if the internal `useQuery` hooks don't explicitly require the modal to be open.
**Action:** When implementing hidden modals in lists that fetch data internally, ensure `useQuery` hooks include the `open` prop in their `enabled` condition (e.g., `enabled: open && !!id`) to prevent unnecessary network requests.
