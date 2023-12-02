import type { TProjectPart } from '@/types/types';
import { type FC } from 'react';

type TProjectActionsProps = {
  setIsEdit: () => void;
  projectData: TProjectPart;
};

export const ProjectActions: FC<TProjectActionsProps> = ({
  projectData,
  setIsEdit,
}) => {
  return (
    <div className='flex flex-col justify-between max-sm:flex-row max-sm:w-full'>
      <button
        onClick={setIsEdit}
        className='text-s14 text-white bg-mainBLue p-1.5 rounded-sm hover:bg-blueHover transition-all duration-200'
      >
        Редагувати
      </button>
      <button className='text-s14 text-white bg-mainRed p-1.5 rounded-sm hover:bg-btnRedHover transition-all duration-200'>
        Видалити
      </button>
    </div>
  );
};
