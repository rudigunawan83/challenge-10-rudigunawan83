## 2026-10-16 - Prevent massive N+1 API requests on load
**Learning:** In list views where each item renders a hidden modal, `useQuery` hooks inside the modal can fire immediately on page load even if the modal isn't open, causing massive N+1 API requests.
**Action:** When optimizing hidden modals in lists, do NOT conditionally render the modal wrapper as it can break UI exit animations relying on the `open` prop. Instead, explicitly require the modal to be open in the internal `useQuery` hooks (e.g., `enabled: isOpen && ...`).
