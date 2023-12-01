import { useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

type TUseAddNewProjectArg = {
  closeModal: () => void;
};

type TAddProjectFormValues = {
  title: string;
  description: string;
  file: File;
};

export const useAddNewProject = ({ closeModal }: TUseAddNewProjectArg) => {
  const { asPath, replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<TAddProjectFormValues>();
  const file = watch('file');
  const descriptionValue = watch('description', '');

  const handleTextareaInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
    setValue('description', event.target.value);
  };

  const handleAddNewProject = async (data: TAddProjectFormValues) => {
    try {
      const session = await getSession();
      const formData = new FormData();

      Object.entries(data).forEach((item) => {
        formData.append(item[0], item[1]);
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/project/create-project`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      console.log(response);
      await replace(asPath);
      closeModal();
      toast.success(response?.data?.message);
      reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.error);
    }
  };

  return {
    handleAddNewProject,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    descriptionValue,
    handleTextareaInput,
    setValue,
    file,
  };
};
