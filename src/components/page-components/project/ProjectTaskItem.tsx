import type { TTask } from '@/types/types';
import React, { type FC } from 'react';

type TProejctTaskItemProps = {
  task: TTask;
};

export const ProjectTaskItem: FC<TProejctTaskItemProps> = ({ task }) => {
  return <div>ProjectTaskItem</div>;
};
