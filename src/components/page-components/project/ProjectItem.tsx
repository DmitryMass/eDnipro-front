import { MainButton } from '@/components/ui/MainButton';
import type { TProject } from '@/types/types';
import { convertAuthorName } from '@/utils/convertAuthorName';
import { convertDynamicDate } from '@/utils/convertDate';
import { downloadFile } from '@/utils/downloadFile';
import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { useState, type FC } from 'react';
import { FileActions } from './FileActions';
import { OpenFile } from './OpenFile';
import { DetailLink } from './DetailLink';

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
        <OpenFile
          setIsOpenFile={() => setIsOpenFile(false)}
          fileName={project.file.file_originalName}
          filePath={project.file.file_path}
        />
      ) : null}
      <div className='flex justify-between items-start mb-2 gap-2'>
        <div className='text-black font-medium grow'>
          <span className='text-s14 max-sm:text-xs12'>Назва проекту:</span>{' '}
          <br />
          <p className='mb-2 font-semibold max-sm:text-s14'> {project.title}</p>
          {project.file ? (
            <FileActions
              fileName={project.file.file_originalName}
              filePath={project.file.file_path}
              setIsOpen={() => setIsOpenFile(true)}
            />
          ) : null}
        </div>
        <span
          className='text-black text-right text-xs12 font-medium pointer-events-none min-w-[80px]'
          suppressHydrationWarning={true}
        >
          {formattedDynamicCreatedAt}
        </span>
      </div>
      <div className='flex items-end justify-between gap-2'>
        <DetailLink route={`${ROUTE.PROJECTS}/${project._id}`} />
        <p className='text-black font-medium text-right text-ellipsis max-w-[150px] overflow-hidden whitespace-nowrap max-md:hidden pointer-events-none'>
          <span className='text-s14 '>Автор:</span>
          <br />
          <span
            className='block text-white px-1 rounded-sm font-normal text-s14 max-sm:text-xs12'
            style={{ backgroundColor: userBackground }}
          >
            {longAuthor}
          </span>
        </p>
        <p className='text-black font-medium text-right text-ellipsis max-w-[150px] overflow-hidden whitespace-nowrap md:hidden pointer-events-none'>
          <span className='text-s14 '>Автор:</span>
          <br />
          <span
            className='block text-white px-1 rounded-sm font-normal text-s14 max-sm:text-xs12'
            style={{ backgroundColor: userBackground }}
          >
            {shortAuthor}
          </span>
        </p>
      </div>
    </div>
  );
};
