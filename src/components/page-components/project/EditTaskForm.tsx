import { FileDrop } from '@/components/ui/FileDrop';
import { Loader } from '@/components/ui/Loader';
import { MainButton } from '@/components/ui/MainButton';
import { useProjectActions } from '@/hooks/useProjectActions';
import { TTask } from '@/types/types';
import clsx from 'clsx';
import { type FC } from 'react';

type TEditTaskFormProps = {
  closeMenu: () => void;
  task: TTask;
};

export const EditTaskForm: FC<TEditTaskFormProps> = ({ closeMenu, task }) => {
  const {
    handleSubmit,
    errors,
    register,
    setValue,
    descriptionValue,
    handleTextareaInput,
    isSubmitting,
    file,
    handleEditTask,
  } = useProjectActions({
    closeMenu,
    defaultValues: { title: task.title, description: task.description },
  });

  return (
    <div>
      <div className='bg-grayStroke-50 p-2.5 rounded-sm w-full mb-4'>
        <form onSubmit={handleSubmit(handleEditTask)}>
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
              placeholder='Редагування опису'
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
            {isSubmitting ? <Loader /> : 'Редагувати'}
          </MainButton>
        </form>
      </div>
    </div>
  );
};
