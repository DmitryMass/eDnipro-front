import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import type { TDefaultValuesProjectAndTask, TFormValues } from '@/types/types';
import { useFormValues } from './useFormValues';

type TUseProjectActionsArgs = {
  closeModal?: () => void;
  closeMenu?: () => void;
  defaultValues?: TDefaultValuesProjectAndTask;
};

export const useProjectActions = ({
  closeModal,
  closeMenu,
  defaultValues,
}: TUseProjectActionsArgs) => {
  const { asPath, replace, query } = useRouter();
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    setValue,
    file,
    descriptionValue,
    handleTextareaInput,
    reset,
  } = useFormValues(defaultValues);

  const handleAddNewProject = async (data: TFormValues) => {
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
      await replace(asPath);
      closeModal && closeModal();
      toast.success(response?.data?.message);
      reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.error);
    }
  };

  const handleEditProject = async (data: TFormValues) => {
    try {
      const projectId = query.id;
      const session = await getSession();
      const formData = new FormData();

      Object.entries(data).forEach((item) => {
        formData.append(item[0], item[1]);
      });

      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/project/update-project/${projectId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );

      await replace(asPath);
      closeMenu && closeMenu();
      toast.success('Project updated successfully');
      reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.error);
    }
  };

  return {
    handleAddNewProject,
    handleEditProject,
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
