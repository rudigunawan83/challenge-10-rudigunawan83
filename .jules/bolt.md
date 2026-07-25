## 2024-05-24 - Prevent N+1 API requests in hidden list modals
**Learning:** When dealing with hidden modals in lists, conditionally rendering the modal wrapper (e.g., `{isOpen && <Modal open={isOpen} />}`) can break UI exit animations that rely on the `open` prop.
**Action:** Instead of unmounting the entire modal wrapper, prevent massive N+1 API requests on page load by ensuring any internal data-fetching (like `useQuery`) explicitly checks the open state (`enabled: open && ...`).
