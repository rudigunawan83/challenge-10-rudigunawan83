## 2024-10-31 - N+1 Queries in Hidden Modals
**Learning:** In list views where each item renders its own modal containing data-fetching hooks (`useQuery`), omitting the modal's `open` state from the `enabled` configuration will trigger an immediate N+1 API cascade on page load (fetching data for every modal, even hidden ones).
**Action:** Always verify that internal data fetching within hidden modals explicitly requires the modal to be open (`enabled: isOpen && ...`) rather than conditionally rendering the modal wrapper, which breaks exit animations.
