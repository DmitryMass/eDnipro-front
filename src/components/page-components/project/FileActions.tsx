import { downloadFile } from '@/utils/downloadFile';
import React, { FC } from 'react';

type TFileActionsProps = {
  setIsOpen: () => void;
  filePath: string;
  fileName: string;
};

export const FileActions: FC<TFileActionsProps> = ({
  filePath,
  setIsOpen,
  fileName,
}) => {
  return (
    <div>
      <button
        onClick={setIsOpen}
        className='max-lg:hidden text-s14 text-mainBLue block mb-1 hover:text-btnBlueHover cursor-pointer hover:underline max-sm:text-xs12'
      >
        Переглянути зображення
      </button>

      <a
        href={`${process.env.NEXT_PUBLIC_CLOUDINARY}${filePath}`}
        target='_blank'
        className='lg:hidden text-s14 text-mainBLue block mb-1 hover:text-btnBlueHover cursor-pointer hover:underline max-sm:text-xs12'
      >
        Переглянути зображення
      </a>

      <button
        className='text-s14 text-mainBLue block hover:text-btnBlueHover cursor-pointer hover:underline max-sm:text-xs12'
        id='downloadButton'
        onClick={() => downloadFile(fileName, filePath)}
      >
        Завантажити зображення
      </button>
    </div>
  );
};
