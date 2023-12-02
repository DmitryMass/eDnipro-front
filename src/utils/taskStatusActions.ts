import { Status } from '@/types/types';

export const taskStatusActions = (status: Status) => {
  if (status === Status.isOpen) {
    return {
      status: 'Відкрита',
      style: { backgroundColor: '#218838' },
    };
  } else if (status === Status.inProgress) {
    return {
      status: 'Виконується',
      style: { backgroundColor: '#ffb000' },
    };
  } else {
    return {
      status: 'Закрита',
      style: { backgroundColor: '#df4553' },
    };
  }
};
