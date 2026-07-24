## 2024-03-24 - N+1 API Requests in Hidden Modals
**Learning:** Components rendered in lists, even if hidden by default (like modals), will still trigger data fetching (e.g., `useQuery`) unless explicitly disabled based on their open state. This can cause massive N+1 API request issues on page load.
**Action:** Always tie the `enabled` flag of data-fetching hooks to the visibility/open state of the component when rendering it repeatedly in lists.
