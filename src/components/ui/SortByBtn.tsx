import React, { ReactNode, type FC } from 'react';

type TSortByBtnProps = {
  children: ReactNode;
  onClick: () => void;
};

export const SortByBtn: FC<TSortByBtnProps> = ({ children, onClick }) => {
  return (
    <button
      className='flex items-center gap-2 text-s14 hover:bg-opacity-90 font-medium mb-2 bg-asidePanel text-white p-1.5 rounded-sm max-sm:text-xs12 max-sm:px-1.5 max-sm:py-0.5'
      onClick={onClick}
    >
      {children}
      <img
        className='w-5 h-5'
        src='/icons/sort-logo.svg'
        alt='sortby createdAt'
      />
    </button>
  );
};
