import clsx from 'clsx';
import { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { UseFormSetValue } from 'react-hook-form';

type TFileDropProps = {
  setValue: UseFormSetValue<any>;
  file: File;
};

export const FileDrop: FC<TFileDropProps> = ({ setValue, file }) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setValue('file', acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/webp': ['.webp'],
    },
  });

  const removeFile = () => {
    setValue('file', null);
  };

  return (
    <div className='flex justify-between items-center gap-2'>
      <div className='text-black grow'>
        {file ? (
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-2 ml-1'>
              <img className='w-4 h-4' src='/icons/file-icon.svg' alt='файл' />
              <p className='max-w-[150px] w-full text-ellipsis overflow-hidden whitespace-nowrap'>
                {file ? file.name : null}
              </p>
            </div>
            <button
              onClick={removeFile}
              className='rounded-sm bg-asidePanel p-1'
            >
              <img
                className='w-4 h-4'
                src='/icons/close-icon.svg'
                alt='видалити'
              />
            </button>
          </div>
        ) : null}
      </div>
      <div
        {...getRootProps()}
        className={clsx(
          'cursor-pointer hover:bg-asidePanel p-1 rounded-sm hover:bg-opacity-20 transition-all duration-100'
        )}
      >
        <img className='w-7 h-7' src='/icons/clip-icon.svg' alt='пін' />
        <input {...getInputProps()} />
      </div>
    </div>
  );
};
