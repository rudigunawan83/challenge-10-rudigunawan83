## 2024-07-15 - [List Modal Optimization]
**Learning:** Hidden modals rendered unconditionally inside large lists (`BlogCard`) significantly bloat DOM size and can trigger massive N+1 API requests if internal `useQuery` hooks are not conditioned on modal open state.
**Action:** Always conditionally unmount hidden list item modals (`{isOpen && <Modal />}`) and tie their internal queries to `enabled: isOpen`.
