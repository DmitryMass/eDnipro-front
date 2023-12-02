import { Loader } from '@/components/ui/Loader';
import { type FC } from 'react';

type TProjectActionsProps = {
  setIsEdit: () => void;
  isEdit: boolean;
  handleDelete: () => Promise<void>;
  isLoading: boolean;
};

export const ProjectActions: FC<TProjectActionsProps> = ({
  setIsEdit,
  isEdit,
  isLoading,
  handleDelete,
}) => {
  return (
    <div className='flex flex-col justify-between max-sm:flex-row max-sm:w-full'>
      <button
        onClick={setIsEdit}
        className='text-s14 flex justify-center items-center text-white bg-mainBLue p-1.5 rounded-sm hover:bg-blueHover transition-all duration-200 font-medium'
      >
        {isEdit ? 'Відміна' : 'Редагувати'}
      </button>
      <button
        disabled={isLoading}
        onClick={handleDelete}
        className='text-s14 text-white bg-mainRed p-1.5 rounded-sm hover:bg-btnRedHover transition-all duration-200 flex justify-center items-center font-medium'
      >
        {isLoading ? <Loader /> : 'Видалити'}
      </button>
    </div>
  );
};
