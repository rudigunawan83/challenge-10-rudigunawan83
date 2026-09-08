
## 2024-05-18 - Fix N+1 API Requests in Hidden React Query Modals
**Learning:** In Next.js / React Query architectures, hidden modals (e.g. `StatisticModal`) rendered within lists (like `BlogCard` list items) can trigger massive N+1 API requests on page load because the component is mounted even if not visibly open. However, conditionally rendering the modal wrapper (e.g., `{isOpen && <Modal open={isOpen} />}`) breaks UI exit animations that rely on the `open` prop.
**Action:** When optimizing hidden modals in lists to prevent N+1 requests, solely use the `open` prop within the `enabled` condition of internal `useQuery` hooks (`enabled: open && ...`) rather than conditionally rendering the entire modal component, preserving both performance and animations.
