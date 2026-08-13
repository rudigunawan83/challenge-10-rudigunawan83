## 2024-05-24 - N+1 API requests from hidden Modals
**Learning:** Hidden modals rendered in lists that fetch data internally using `useQuery` will trigger massive N+1 requests on mount if the modal's `open` state isn't checked.
**Action:** Always include `open` in the `enabled` condition of `useQuery` within modal components to defer data fetching until the modal is actually opened.
