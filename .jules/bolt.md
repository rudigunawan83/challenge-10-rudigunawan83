## 2025-02-18 - Prevent N+1 queries in hidden modals
**Learning:** Hidden components (like modals) rendered inside a list (like `BlogCard`) can cause massive N+1 API request issues on page load if they contain `useQuery` hooks that aren't conditionally enabled based on their visibility.
**Action:** When optimizing lists, verify any data-fetching inside child modals explicitly require the modal to be open (e.g., `enabled: open && ...`) instead of conditionally rendering the modal wrapper, which can break exit animations.
