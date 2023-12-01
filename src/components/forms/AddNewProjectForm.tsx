import { useAddNewProject } from '@/hooks/useAddNewProject';
import clsx from 'clsx';
import { type FC } from 'react';
import { FileDrop } from '../ui/FileDrop';
import { Loader } from '../ui/Loader';
import { MainButton } from '../ui/MainButton';

type TAddNewProjectFormProps = {
  closeModal: () => void;
};

export const AddNewProjectForm: FC<TAddNewProjectFormProps> = ({
  closeModal,
}) => {
  const {
    handleAddNewProject,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    descriptionValue,
    handleTextareaInput,
    setValue,
    file,
  } = useAddNewProject({ closeModal });

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-black font-medium'>Створити новий проект</h3>
        <button onClick={closeModal} className='bg-asidePanel rounded-md p-1'>
          <img className='w-5 h-5' src='/icons/close-icon.svg' alt='close' />
        </button>
      </div>
      <form onSubmit={handleSubmit(handleAddNewProject)}>
        <label className='relative block mb-5'>
          <input
            className={clsx(
              'w-full py-1.5 px-3.5 text-s14 text-black font-medium outline-grayStroke-70 rounded-sm border border-grayStroke-100 border-opacity-20',
              errors.title ? 'border-mainRed outline-mainRed' : null
            )}
            placeholder='Назва проекту'
            {...register('title', {
              required: `Назва обов'язкова!`,
              validate: (value) => {
                const ukrainianPattern =
                  /^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9!?,."'\s@.+\-()]+$/;
                const noLeadingTrailingSpace = /^(?!\s)(.*\S)?(?<!\s)$/;
                if (!ukrainianPattern.test(value)) {
                  return 'Тільки українські та англійські літери, цифри';
                }
                if (!noLeadingTrailingSpace.test(value)) {
                  return 'Пробіли на початку та в кінці не допускаються.';
                }
                return true;
              },
            })}
          />
          {errors.title ? (
            <span className='absolute left-1 -top-3 text-mainRed text-xs10'>
              * {errors.title.message}
            </span>
          ) : null}
        </label>

        <label className='relative block flex-1 mb-3'>
          <textarea
            className={clsx(
              'w-full block pl-3.5 py-2 pr-8 text-s14 font-medium rounded-sm outline-grayStroke-70 text-black',
              errors.description ? 'border-mainRed' : null,
              'overflow-hidden h-auto py-1 resize-none'
            )}
            placeholder='Опис нового проекту'
            {...register('description', {
              validate: (value) => {
                const ukrainianPattern =
                  /^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9!?,."'\s@.+\-()]+$/;
                const noLeadingTrailingSpace = /^(?!\s)(.*\S)?(?<!\s)$/;
                if (!ukrainianPattern.test(value)) {
                  return 'Тільки українські та англійські літери, цифри';
                }
                if (!noLeadingTrailingSpace.test(value)) {
                  return 'Пробіли на початку та в кінці не допускаються.';
                }
                return true;
              },
            })}
            rows={3}
            style={{
              overflowWrap: 'break-word',
            }}
            value={descriptionValue}
            onInput={handleTextareaInput}
          />
          {errors.description ? (
            <span className='absolute left-1 -top-3.5 text-mainRed text-xs10'>
              * {errors.description.message}
            </span>
          ) : null}
        </label>
        <div className='mb-3'>
          <FileDrop setValue={setValue} file={file} />
        </div>

        <MainButton
          type='submit'
          classModificator='w-full text-s14'
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader /> : 'Додати новий проект'}
        </MainButton>
      </form>
    </div>
  );
};
