import { FileDrop } from '@/components/ui/FileDrop';
import { Loader } from '@/components/ui/Loader';
import { MainButton } from '@/components/ui/MainButton';
import { useProjectActions } from '@/hooks/useProjectActions';
import clsx from 'clsx';
import { useState, type FC } from 'react';

export const AddNewTaskIntoProject: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    handleSubmit,
    errors,
    register,
    setValue,
    descriptionValue,
    handleTextareaInput,
    isSubmitting,
    file,
    handleCreateNewTask,
  } = useProjectActions({
    closeMenu: () => setIsModalOpen(false),
  });

  return (
    <div>
      <MainButton
        classModificator='hover:bg-opacity-80'
        type='button'
        onClick={() => setIsModalOpen(true)}
      >
        Додати задачу
      </MainButton>
      <div
        className={clsx(
          'w-full h-full fixed inset-0 bg-asidePanel flex justify-center bg-opacity-90 items-center z-20 transition-all duration-300 px-2.5',
          isModalOpen ? '-translate-y-0' : '-translate-y-full'
        )}
      >
        <div className='max-w-xl w-full mx-auto bg-grayStroke-50 rounded-md p-4 shadow-md relative'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-black font-medium'>Додати задачу до проекту</h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className='bg-asidePanel rounded-md p-1'
            >
              <img
                className='w-5 h-5'
                src='/icons/close-icon.svg'
                alt='close'
              />
            </button>
          </div>
          <form onSubmit={handleSubmit(handleCreateNewTask)}>
            <label className='block mb-5'>
              {errors.title ? (
                <span className='text-mainRed text-xs10'>
                  * {errors.title.message}
                </span>
              ) : null}
              <input
                className={clsx(
                  'w-full py-1.5 px-3.5 text-s14 text-black font-medium outline-grayStroke-70 rounded-sm border border-grayStroke-100 border-opacity-20',
                  errors.title ? 'border-mainRed outline-mainRed' : null
                )}
                placeholder='Назва завдання'
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
            </label>

            <label className='block flex-1 mb-3'>
              {errors.description ? (
                <span className='text-mainRed text-xs10'>
                  * {errors.description.message}
                </span>
              ) : null}
              <textarea
                className={clsx(
                  'w-full block pl-3.5 py-2 pr-8 text-s14  font-medium rounded-sm outline-grayStroke-70 text-black',
                  errors.description ? 'border-mainRed' : null,
                  'overflow-hidden h-auto py-1 resize-none'
                )}
                placeholder='Опис завдання'
                {...register('description', {
                  required: `Опис завдання обов'язкове поле`,
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
            </label>
            <div className='mb-3'>
              <p className='text-xs12 text-black text-right'>
                Оновити зображення:
              </p>
              <FileDrop setValue={setValue} file={file} />
            </div>
            <MainButton
              type='submit'
              classModificator='w-full text-s14'
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader /> : 'Додати нову задачу'}
            </MainButton>
          </form>
        </div>
      </div>
    </div>
  );
};
