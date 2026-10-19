## 2023-10-27 - [N+1 Queries in Hidden Modals]
**Learning:** If a component with internal data fetching via `useQuery` is mapped over an array (e.g., a modal rendered for every post in a list), it will fetch data immediately on mount even if hidden (`open=false`), leading to a massive N+1 query problem on page load.
**Action:** Always constrain internal data fetching within modals to wait until the modal is actually open by passing `enabled: open && ...` to `useQuery`. Do not conditionally render the modal wrapper component itself if it breaks exit animations.
