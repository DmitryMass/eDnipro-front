import { Status } from '@/types/types';
import { taskStatusActions } from '@/utils/taskStatusActions';
import React, { FC } from 'react';

type TTaskStatus = {
  status: Status;
  classNameModificator?: string;
};

export const TaskStatus: FC<TTaskStatus> = ({
  status,
  classNameModificator,
}) => {
  const { status: taskStatus, style } = taskStatusActions(status);
  return (
    <div className={classNameModificator}>
      <p
        className='text-white text-xs12 inline-block p-1 font-medium'
        style={style}
      >
        {taskStatus}
      </p>
    </div>
  );
};
