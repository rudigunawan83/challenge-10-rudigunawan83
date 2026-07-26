## 2024-07-26 - Hidden Modal API Calls
**Learning:** Components wrapping modals that fetch data using React Query on mount can cause N+1 query performance issues when loaded in a list view (e.g., a feed), even if the modal is hidden.
**Action:** For hidden modals that fetch data internally, ensure the fetch is conditional on the modal being open (e.g., `enabled: open`).
