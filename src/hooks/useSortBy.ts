import { useRouter } from 'next/router';

export const useSortBy = () => {
  const { query, push } = useRouter();
  const toggleSortOrder = () => {
    const currentSortOrder = query.sortBy || 'desc';
    const newSortOrder = currentSortOrder === 'desc' ? 'asc' : 'desc';
    push({ query: { page: 1, sortBy: newSortOrder } });
  };

  return {
    toggleSortOrder,
  };
};
