import type { TTask } from '@/types/types';
import { convertDate } from '@/utils/convertDate';
import { ROUTE } from '@/utils/routes';
import { type FC } from 'react';
import { DetailLink } from './DetailLink';
import { TaskPerfomingBy } from './TaskPerfomingBy';
import { taskStatusActions } from '@/utils/taskStatusActions';
import { TaskStatus } from './TaskStatus';

type TProejctTaskItemProps = {
  task: TTask;
};

export const ProjectTaskItem: FC<TProejctTaskItemProps> = ({ task }) => {
  const { formattedCreatedAt } = convertDate(task.createdAt, task.updatedAt);

  return (
    <div className='bg-white shadow-md rounded-sm p-2 flex flex-col justify-between'>
      <div className='flex justify-between items-start gap-2'>
        <div className='grow'>
          <h2 className='text-black text-s14 font-medium mb-2'>
            <span className='text-xs12 font-normal mb-1'>Назва задачі:</span>{' '}
            <br />
            {task.title}
          </h2>
        </div>
        <span
          className='text-black text-right text-xs12 font-medium pointer-events-none min-w-[110px]'
          suppressHydrationWarning={true}
        >
          {formattedCreatedAt}
        </span>
      </div>
      <div className='flex justify-between gap-4 items-end'>
        <DetailLink route={`${ROUTE.PROJECTS}/${task.projectId}/${task._id}`} />
        {task.perfomingBy ? (
          <div className='flex flex-col items-end gap-1'>
            <TaskStatus
              status={task.status}
              classNameModificator='text-right'
            />
            <TaskPerfomingBy
              status={task.status}
              user={task.perfomingBy}
              classNameModificator='text-right'
            />
          </div>
        ) : (
          <div className='text-right'>
            <p className='text-xs12 text-black'>Задача вільна</p>
            <TaskStatus
              status={task.status}
              classNameModificator='text-right'
            />
          </div>
        )}
      </div>
    </div>
  );
};
