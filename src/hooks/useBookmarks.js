import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'portfolio-project-bookmarks-v1';

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useBookmarks() {
  const [ids, setIds] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Storage full or disabled — silently ignore
    }
  }, [ids]);

  const toggle = useCallback((id) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const isBookmarked = useCallback((id) => ids.includes(id), [ids]);

  return { ids, toggle, isBookmarked, count: ids.length };
}
