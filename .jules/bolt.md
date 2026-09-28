## 2024-05-24 - N+1 Query on Modal
**Learning:** In Next.js/React applications utilizing Tanstack Query (`useQuery`), fetching data for modals inside mapped lists without explicitly tying the `enabled` prop to the modal`s `open` state can cause severe N+1 API request bursts on initial page load, degrading frontend performance significantly.
**Action:** When implementing modal components inside lists that require their own data fetching, ALWAYS ensure `useQuery` is conditionally enabled only when the modal is actually open (e.g. `enabled: open && ...`).
