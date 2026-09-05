## 2026-09-05 - Delay Data Fetching for Hidden Modals
**Learning:** Component `useQuery` hooks can trigger N+1 API requests on page load if rendered inside a list without an explicit check for visibility (e.g., if a modal is open). The early return `if (!open) return null` does not prevent the hook from firing on mount.
**Action:** When working with data-fetching inside modals used in lists, always use the modal's `open` prop to guard the fetch conditionally using React Query's `enabled` flag.
