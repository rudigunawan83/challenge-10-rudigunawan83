## 2024-05-18 - Optimized Hidden Modals using React Query

**Learning:** When using React Query (`useQuery`) inside a modal component that is rendered repeatedly in a list (even if conditionally returning `null` when closed), it can trigger massive N+1 API requests on page load if the `enabled` flag doesn't explicitly check the `open` state.

**Action:** Always ensure that any internal data-fetching inside modal components explicitly requires the modal to be open by passing the `open` prop to the `enabled` option of `useQuery`. Do NOT conditionally render the modal wrapper itself, as that can break exit animations.
