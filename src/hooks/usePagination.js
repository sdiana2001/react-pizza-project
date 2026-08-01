import { useMemo } from 'react';

export function usePagination(items = [], itemsPerPage = 8, currentPage = 1) {
  // 1. Считаем общее количество страниц
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // 2. Нарезаем элементы под текущую страницу (из Redux)
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  return {
    totalPages,
    currentItems,
  };
}
