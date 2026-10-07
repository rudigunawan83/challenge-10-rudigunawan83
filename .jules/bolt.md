## 2024-10-07 - [N+1 Data Fetching in Hidden Modals]
**Learning:** React Query hooks placed before early returns in modal components (like `StatisticModal.tsx`) will execute even if the modal wrapper handles visibility (`open` prop), leading to severe N+1 API request bottlenecks when rendering lists of items.
**Action:** Always conditionally disable data-fetching hooks (e.g. `enabled: open`) when the modal is conceptually closed instead of rendering conditionally to preserve entrance/exit animations.
