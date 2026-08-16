## 2024-06-18 - [Optimizing Hidden Modals with useQuery]
**Learning:** In Next.js/React lists rendering hidden modals per item, avoid conditionally rendering the modal wrapper if it breaks exit animations. The performance bottleneck is often eager API fetching via `useQuery` inside the hidden modal.
**Action:** When preventing N+1 API requests on page load for hidden modals, do not conditionalize the modal wrapper; instead, strictly verify the `useQuery` hooks include `enabled: !!isOpen` to defer data fetching until interaction.
