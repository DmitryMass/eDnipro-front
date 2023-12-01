import { getPaginationTemplate } from '@/utils/getPaginationTemplate';
import { FC, Fragment } from 'react';
import { PaginationButton } from './PaginationButton';
import { useRouter } from 'next/router';

type TPaginationProps = {
  activePageNumber: number;
  pagesCount: number;
};

export const Pagination: FC<TPaginationProps> = ({
  activePageNumber,
  pagesCount,
}) => {
  const paginationTemplate = getPaginationTemplate(
    activePageNumber,
    pagesCount
  );

  const router = useRouter();
  const handlePageChange = (pageNumber: number) => {
    router.push({
      query: { ...router.query, page: pageNumber },
    });
  };
  return (
    <div className='flex justify-center gap-3'>
      {activePageNumber !== 1 ? (
        <PaginationButton
          variant='prev'
          activePageNumber={activePageNumber}
          pagesCount={pagesCount}
        />
      ) : null}
      <div className='flex gap-1 justify-center items-center text-parM'>
        {paginationTemplate.map((item, i) => (
          <Fragment key={i}>
            {item === '...' ? (
              <p className='font-bold px-1'>...</p>
            ) : (
              <button
                onClick={
                  item === '...'
                    ? () => {}
                    : () => handlePageChange(item as number)
                }
                disabled={activePageNumber === item}
                className='rounded-md w-7 h-7 border text-black disabled:text-grayStroke-30 transition-all duration-300'
              >
                {item}
              </button>
            )}
          </Fragment>
        ))}
      </div>
      {activePageNumber !== pagesCount ? (
        <PaginationButton
          variant='next'
          activePageNumber={activePageNumber}
          pagesCount={pagesCount}
        />
      ) : null}
    </div>
  );
};
