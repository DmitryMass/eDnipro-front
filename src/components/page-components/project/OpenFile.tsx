import { MainButton } from '@/components/ui/MainButton';
import React, { FC } from 'react';

type TOpenFileProps = {
  setIsOpenFile: () => void;
  filePath: string;
  fileName: string;
};

export const OpenFile: FC<TOpenFileProps> = ({
  fileName,
  filePath,
  setIsOpenFile,
}) => {
  return (
    <div className='fixed inset-0 w-full h-full bg-asidePanel bg-opacity-90 flex justify-center items-center'>
      <div className='max-w-[800px] flex justify-center items-center flex-col h-screen'>
        <img
          className='w-full block max-h-[80vh] px-1.5'
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY}${filePath}`}
          alt={fileName}
        />
      </div>
      <div className='w-[60px] absolute top-10 right-10 z-50'>
        <MainButton
          onClick={setIsOpenFile}
          type='button'
          classModificator='h-[50px]'
        >
          <img className='w-8 h-8' src='/icons/close-icon.svg' alt='close' />
        </MainButton>
      </div>
    </div>
  );
};
