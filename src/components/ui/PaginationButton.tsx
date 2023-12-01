import { FC } from 'react';

type TPaginationBtnProps = {
  variant: 'next' | 'prev';
  activePageNumber: number;
};

export const PaginationButton: FC<TPaginationBtnProps> = ({
  variant,
  activePageNumber,
}) => {
  return (
    <button className='w-7 h-7 text-black rounded-md font-semibold text-dispS3  hover:bg-darkGray-10 transition-all duration-300'>
      {variant === 'prev' ? '<' : '>'}
    </button>
  );
};
