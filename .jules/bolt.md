## 2024-10-06 - N+1 Queries in Hidden Modals
**Learning:** In list views where each item renders a hidden modal (e.g., \`StatisticModal\` in \`BlogCard\`), using unconditional \`useQuery\` hooks inside the modal will trigger massive N+1 API requests on page load, even if the modal is closed.
**Action:** Always add the modal's \`open\` state to the \`enabled\` condition of \`useQuery\` hooks inside it (e.g., \`enabled: !!id && open\`) to defer fetching until the modal is actually displayed. Do not conditionally render the modal wrapper itself if it relies on exit animations.
