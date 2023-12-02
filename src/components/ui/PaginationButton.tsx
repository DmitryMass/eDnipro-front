import { useRouter } from 'next/router';
import { FC } from 'react';

type TPaginationBtnProps = {
  variant: 'next' | 'prev';
  activePageNumber: number;
  pagesCount: number;
};

export const PaginationButton: FC<TPaginationBtnProps> = ({
  variant,
  activePageNumber,
  pagesCount,
}) => {
  const router = useRouter();
  const handlePageChange = () => {
    const newPageNumber =
      variant === 'prev' ? activePageNumber - 1 : activePageNumber + 1;
    router.push({
      query: { ...router.query, page: newPageNumber },
    });
  };

  return (
    <button
      onClick={handlePageChange}
      disabled={
        (variant === 'prev' && activePageNumber === 1) ||
        (variant === 'next' && activePageNumber === pagesCount)
      }
      className='w-7 h-7 text-black rounded-md font-semibold text-dispS3  hover:bg-darkGray-10 transition-all duration-300'
    >
      {variant === 'prev' ? '<' : '>'}
    </button>
  );
};
