import type { TProject } from '@/types/types';
import { convertAuthorName } from '@/utils/convertAuthorName';
import { convertDynamicDate } from '@/utils/convertDate';
import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { type FC } from 'react';

type TProjectItemProps = {
  project: TProject;
};

export const ProjectItem: FC<TProjectItemProps> = ({ project }) => {
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
      <div className='flex justify-between items-start mb-2 gap-2'>
        <p className='text-black font-medium grow pointer-events-none'>
          <span className='text-s14'>Назва проекту:</span> <br />
          {project.title}
        </p>
        <span
          className='text-black text-xs12 font-medium pointer-events-none'
          suppressHydrationWarning={true}
        >
          {formattedDynamicCreatedAt} ago
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
