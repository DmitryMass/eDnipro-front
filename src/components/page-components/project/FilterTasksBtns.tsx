import { FilterStatus } from '@/types/types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const FilterTasksBtns: FC = () => {
  const router = useRouter();
  const handlePushFilter = (filteredStatus: string) => {
    router.push({
      query: { ...router.query, filteredStatus },
    });
  };

  const filter = router.query.filteredStatus;

  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={() => handlePushFilter(FilterStatus.all)}
        className={clsx(
          'flex items-center gap-2 text-s14 bg-opacity-70 hover:bg-opacity-90 font-medium mb-2 bg-asidePanel text-white p-1.5 rounded-sm max-sm:text-xs12 max-sm:px-1.5 max-sm:py-0.5',
          !filter || filter === FilterStatus.all ? 'bg-opacity-100' : null
        )}
      >
        Всі
      </button>
      <button
        onClick={() => handlePushFilter(FilterStatus.isOpen)}
        className={clsx(
          'flex items-center gap-2 text-s14 bg-opacity-70 hover:bg-opacity-90 font-medium mb-2 bg-asidePanel text-white p-1.5 rounded-sm max-sm:text-xs12 max-sm:px-1.5 max-sm:py-0.5',
          filter === FilterStatus.isOpen ? 'bg-opacity-100' : null
        )}
      >
        Відкриті
      </button>
      <button
        onClick={() => handlePushFilter(FilterStatus.inProgress)}
        className={clsx(
          'flex items-center gap-2 text-s14 bg-opacity-70 hover:bg-opacity-90 font-medium mb-2 bg-asidePanel text-white p-1.5 rounded-sm max-sm:text-xs12 max-sm:px-1.5 max-sm:py-0.5',
          filter === FilterStatus.inProgress ? 'bg-opacity-100' : null
        )}
      >
        У розробці
      </button>
      <button
        onClick={() => handlePushFilter(FilterStatus.isClosed)}
        className={clsx(
          'flex items-center gap-2 text-s14 bg-opacity-70 hover:bg-opacity-90 font-medium mb-2 bg-asidePanel text-white p-1.5 rounded-sm max-sm:text-xs12 max-sm:px-1.5 max-sm:py-0.5',
          filter === FilterStatus.isClosed ? 'bg-opacity-100' : null
        )}
      >
        Закриті
      </button>
    </div>
  );
};
