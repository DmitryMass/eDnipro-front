import clsx from 'clsx';
import { type FC, useState } from 'react';
import { MainButton } from './MainButton';

export const AddNewProject: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // написать запрос на создание проектов (поля + фото)

  return (
    <div className='relative'>
      <MainButton
        type='button'
        classModificator='bg-black transition-all duration-200 rounded-sm font-normal hover:bg-opacity-60'
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        Новий проект +
      </MainButton>
      <div
        className={clsx(
          'w-full h-full fixed inset-0 bg-asidePanel  flex justify-center bg-opacity-80 items-center z-20 transition-all duration-300',
          isModalOpen ? '-translate-y-full' : '-translate-y-0'
        )}
      >
        <div className='max-w-xl mx-auto bg-grayStroke-50 rounded-md p-4 shadow-md relative'>
          <button
            className='absolute top-2 right-2'
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};
