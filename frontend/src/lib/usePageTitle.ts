import { useEffect } from 'react';

const BASE_TITLE = 'Explora Chile';

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE_TITLE}` : `${BASE_TITLE} — Experiencias Curadas`;
  }, [title]);
}
