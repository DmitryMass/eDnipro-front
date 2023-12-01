import { MainButton } from '@/components/ui/MainButton';
import type { TProject } from '@/types/types';
import { convertAuthorName } from '@/utils/convertAuthorName';
import { convertDynamicDate } from '@/utils/convertDate';
import { downloadFile } from '@/utils/downloadFile';
import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { useState, type FC } from 'react';

type TProjectItemProps = {
  project: TProject;
};

export const ProjectItem: FC<TProjectItemProps> = ({ project }) => {
  const [isOpenFile, setIsOpenFile] = useState(false);
  const { firstName, lastName, email, userBackground } =
    project.authorOfСreation;

  const { formattedDynamicCreatedAt } = convertDynamicDate(
    project.createdAt,
    project.updatedAt
  );

  const { longAuthor, shortAuthor } = convertAuthorName(
    firstName,
    lastName,
    email
  );

  return (
    <div className='bg-white text-white p-2.5 rounded-md border-[10px] border-asidePanel flex flex-col justify-between'>
      {isOpenFile ? (
        <div className='fixed inset-0 w-full h-full bg-asidePanel bg-opacity-90 flex justify-center items-center'>
          <div className='max-w-[400px]'>
            <img
              className='w-full block max-h-[600px] px-1.5'
              src={`${process.env.NEXT_PUBLIC_CLOUDINARY}${project.file.file_path}`}
              alt={project.file.file_originalName}
            />
          </div>
          <MainButton
            onClick={() => setIsOpenFile(false)}
            type='button'
            classModificator='absolute top-10 right-10 w-[60px] h-[50px] z-50'
          >
            <img className='w-8 h-8' src='/icons/close-icon.svg' alt='' />
          </MainButton>
        </div>
      ) : null}
      <div className='flex justify-between items-start mb-2 gap-2'>
        <div className='text-black font-medium grow'>
          <span className='text-s14'>Назва проекту:</span> <br />
          <p className='mb-2'> {project.title}</p>
          {project.file ? (
            <div className=''>
              <button
                onClick={() => setIsOpenFile(true)}
                className='text-s14 text-mainBLue block mb-1 hover:text-btnBlueHover cursor-pointer hover:underline'
              >
                Переглянути зображення
              </button>
              <button
                className='text-s14 text-mainBLue block hover:text-btnBlueHover cursor-pointer hover:underline'
                id='downloadButton'
                onClick={() =>
                  downloadFile(
                    project.file.file_originalName,
                    project.file.file_path
                  )
                }
              >
                Завантажити зображення
              </button>
            </div>
          ) : null}
        </div>
        <span
          className='text-black text-right text-xs12 font-medium pointer-events-none w-[100px]'
          suppressHydrationWarning={true}
        >
          {formattedDynamicCreatedAt}
        </span>
      </div>
      <div className='flex items-end justify-between gap-2'>
        <Link
          href={`${ROUTE.PROJECTS}/${project._id}`}
          className='cursor-pointer text-white rounded-sm px-2.5 py-1 text-s14 hover:bg-opacity-90 transition-all duration-150 bg-asidePanel'
        >
          Деталі
        </Link>
        <p className='text-black font-medium text-right text-ellipsis max-w-[150px] overflow-hidden whitespace-nowrap max-md:hidden pointer-events-none'>
          <span className='text-s14 '>Автор:</span>
          <br />
          <span
            className='block text-white px-1 rounded-sm font-normal'
            style={{ backgroundColor: userBackground }}
          >
            {longAuthor}
          </span>
        </p>
        <p className='text-black font-medium text-right text-ellipsis max-w-[150px] overflow-hidden whitespace-nowrap md:hidden pointer-events-none'>
          <span className='text-s14 '>Автор:</span>
          <br />
          <span
            className='block text-white px-1 rounded-sm font-normal'
            style={{ backgroundColor: userBackground }}
          >
            {shortAuthor}
          </span>
        </p>
      </div>
    </div>
  );
};
