import clsx from 'clsx';
import { type FC, useState } from 'react';
import { MainButton } from './MainButton';
import { AddNewProjectForm } from '../forms/AddNewProjectForm';

export const AddNewProject: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // написать запрос на создание проектов (поля + фото)

  return (
    <div className='relative'>
      <MainButton
        type='button'
        classModificator='bg-black block transition-all duration-200 rounded-sm font-normal hover:bg-opacity-60'
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        Новий проект +
      </MainButton>
      <div
        className={clsx(
          'w-full h-full fixed inset-0 bg-asidePanel  flex justify-center bg-opacity-80 items-center z-20 transition-all duration-300 px-2.5',
          isModalOpen ? '-translate-0-full' : '-translate-y-full'
        )}
      >
        <div className='max-w-xl w-full mx-auto bg-grayStroke-50 rounded-md p-4 shadow-md relative'>
          <AddNewProjectForm
            closeModal={() => setIsModalOpen((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
};
