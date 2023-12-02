import { TDefaultValuesProjectAndTask, TFormValues } from '@/types/types';
import { useForm } from 'react-hook-form';

export const useFormValues = (defaultValues?: TDefaultValuesProjectAndTask) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<TFormValues>({ defaultValues });

  const file = watch('file');
  const descriptionValue = watch('description', '');

  const handleTextareaInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
    setValue('description', event.target.value);
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    setValue,
    file,
    descriptionValue,
    handleTextareaInput,
    reset,
  };
};
