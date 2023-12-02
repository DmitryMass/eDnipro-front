import { type FC } from 'react';

import { ProjectForm } from './ProjectForm';

type TAddNewProjectFormProps = {
  closeModal: () => void;
};

export const AddNewProjectForm: FC<TAddNewProjectFormProps> = ({
  closeModal,
}) => {
  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-black font-medium'>Створити новий проект</h3>
        <button onClick={closeModal} className='bg-asidePanel rounded-md p-1'>
          <img className='w-5 h-5' src='/icons/close-icon.svg' alt='close' />
        </button>
      </div>
      <ProjectForm closeModal={closeModal} />
    </div>
  );
};
