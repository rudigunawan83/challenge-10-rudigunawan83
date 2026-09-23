## 2024-05-29 - Hidden Modal N+1 API Request Issue
**Learning:** React Query `useQuery` hooks inside hidden modals will fire on page load if `enabled` does not factor in the modal's `open` state, leading to massive N+1 API requests when modals are rendered in lists (e.g., BlogCards).
**Action:** Always ensure internal data-fetching in modal components explicitly requires the modal to be open (`enabled: isOpen && ...`) rather than conditionally rendering the modal wrapper, which can break UI exit animations.
