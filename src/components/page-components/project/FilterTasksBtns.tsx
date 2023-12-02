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
        onClick={() => handlePushFilter('all')}
        className={clsx(
          'flex items-center gap-2 text-s14 bg-opacity-70 hover:bg-opacity-90 font-medium mb-2 bg-asidePanel text-white p-1.5 rounded-sm max-sm:text-xs12 max-sm:px-1.5 max-sm:py-0.5'
        )}
        style={{
          backgroundColor:
            !filter || filter === 'all' ? 'black' : 'rgb(52 58 64 / 71%)',
        }}
      >
        Всі
      </button>
      <button
        onClick={() => handlePushFilter('isopen')}
        className={clsx(
          'flex items-center gap-2 text-s14 bg-opacity-70 hover:bg-opacity-90 font-medium mb-2 bg-asidePanel text-white p-1.5 rounded-sm max-sm:text-xs12 max-sm:px-1.5 max-sm:py-0.5'
        )}
        style={{
          backgroundColor:
            filter === 'isopen' ? 'black' : 'rgb(52 58 64 / 71%)',
        }}
      >
        Відкриті
      </button>
      <button
        onClick={() => handlePushFilter('inprogress')}
        className={clsx(
          'flex items-center gap-2 text-s14 bg-opacity-70 hover:bg-opacity-90 font-medium mb-2 bg-asidePanel text-white p-1.5 rounded-sm max-sm:text-xs12 max-sm:px-1.5 max-sm:py-0.5'
        )}
        style={{
          backgroundColor:
            filter === 'inprogress' ? 'black' : 'rgb(52 58 64 / 71%)',
        }}
      >
        У розробці
      </button>
      <button
        onClick={() => handlePushFilter('isclosed')}
        className={clsx(
          'flex items-center gap-2 text-s14 bg-opacity-70 hover:bg-opacity-90 font-medium mb-2 bg-asidePanel text-white p-1.5 rounded-sm max-sm:text-xs12 max-sm:px-1.5 max-sm:py-0.5'
        )}
        style={{
          backgroundColor:
            filter === 'isclosed' ? 'black' : 'rgb(52 58 64 / 71%)',
        }}
      >
        Закриті
      </button>
    </div>
  );
};
