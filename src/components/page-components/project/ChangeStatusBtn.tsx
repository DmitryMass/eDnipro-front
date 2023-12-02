import { Loader } from '@/components/ui/Loader';
import { useChangeStatus } from '@/hooks/useChangeStatus';
import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

type TChangeStatusBtnProps = {
  taskId: string;
  status: string;
  children: ReactNode;
  changeStatus: string;
};

export const ChangeStatusBtn: FC<TChangeStatusBtnProps> = ({
  status,
  taskId,
  children,
  changeStatus,
}) => {
  const { handleChangeStatus, isLoading } = useChangeStatus(taskId);
  return (
    <>
      {status === 'inprogress' ? (
        <button
          disabled={isLoading}
          className={clsx(
            'bg-blue-950 max-md:text-xs12 w-[150px] text-s14 flex justify-center items-center text-white hover:bg-blueHover rounded-sm py-1.5 px-2.5 mt-2 transition-all duration-200',
            isLoading ? 'bg-blueHover' : ''
          )}
          onClick={() => handleChangeStatus(changeStatus)}
        >
          {isLoading ? <Loader /> : children}
        </button>
      ) : null}
    </>
  );
};
