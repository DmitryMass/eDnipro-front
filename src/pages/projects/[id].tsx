import { FileActions } from '@/components/page-components/project/FileActions';
import { FilterTasksBtns } from '@/components/page-components/project/FilterTasksBtns';
import { OpenFile } from '@/components/page-components/project/OpenFile';
import { ProjectActions } from '@/components/page-components/project/ProjectActions';
import { ProjectTaskItem } from '@/components/page-components/project/ProjectTaskItem';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Pagination } from '@/components/ui/Pagination';
import { SortByBtn } from '@/components/ui/SortByBtn';
import { Title } from '@/components/ui/Title';
import { useSortBy } from '@/hooks/useSortBy';
import type { TProjectPart, TTask } from '@/types/types';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useState, type FC } from 'react';

type TProjectTasksProps = {
  tasks: TTask[];
  pageCount?: number;
  error?: any;
  pageNum: number;
  project?: TProjectPart;
};

export const getServerSideProps: GetServerSideProps<
  TProjectTasksProps
> = async (ctx) => {
  const session = await getSession(ctx);
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, max-age=120, stale-while-revalidate=59'
  );

  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  const filteredStatus = ctx.query.filteredStatus
    ? ctx.query.filteredStatus
    : 'all';
  const url = ctx.query.sortBy
    ? `/project/${ctx.query.id}?page=${pageNum}&limit=6&sortBy=${ctx.query.sortBy}&filteredStatus=${filteredStatus}`
    : `/project/${ctx.query.id}?page=${pageNum}&limit=6&filteredStatus=${filteredStatus}`;

  try {
    const response: any = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}${url}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );

    const pageCount = Math.ceil(response.data.total / 6);

    return {
      props: {
        tasks: response.data.tasks,
        pageCount,
        pageNum,
        project: response.data.project,
      },
    };
  } catch (err: any) {
    return {
      props: {
        tasks: [],
        pageNum,
        error: err?.response?.data?.error
          ? err.response.data.error
          : 'Internal server error. Try later.',
      },
    };
  }
};

const ProjectTasks: FC<TProjectTasksProps> = ({
  pageNum,
  tasks,
  error,
  pageCount,
  project,
}) => {
  if (error || !project) {
    return (
      <ErrorMessage
        message={error ? error : 'Проект не знайдено'}
        classNameModificator='bg-asidePanel p-3.5 text-center mt-5'
      />
    );
  }
  const [isOpenFile, setIsOpenFile] = useState<boolean>(false);
  const { toggleSortOrder } = useSortBy();

  return (
    <div>
      <Title classModificator='text-2xl mb-2 text-grayStroke-90 font-medium max-sm:text-xl'>
        Задачі проекту
      </Title>
      <div className='rounded-sm p-2.5 bg-white shadow-md text-black mb-4 flex max-sm:flex-col max-sm:items-start gap-6'>
        <div className='grow'>
          <h2 className='text-black mb-4 text-xl font-medium max-sm:text-s14'>
            <span className='text-s14 font-normal max-sm:text-xs12'>
              Назва проекту:
            </span>{' '}
            <br />
            {project?.title}
          </h2>
          <p className='text-black font-medium max-sm:text-s14 max-w-5xl w-full mb-4'>
            <span className='text-s14 font-normal max-sm:text-xs12'>
              Опис проекту:
            </span>{' '}
            <br />
            {project?.description}
          </p>
          {project?.file ? (
            <>
              {isOpenFile ? (
                <OpenFile
                  setIsOpenFile={() => setIsOpenFile(false)}
                  fileName={project?.file.file_originalName}
                  filePath={project?.file.file_path}
                />
              ) : null}
              <FileActions
                fileName={project.file.file_originalName}
                filePath={project.file.file_path}
                setIsOpen={() => setIsOpenFile(true)}
              />
            </>
          ) : null}
        </div>
        <ProjectActions projectData={project} setIsEdit={() => {}} />
      </div>
      <div>
        <div className='mb-4 flex items-center gap-2 max-sm:flex-col max-sm:items-start'>
          <SortByBtn onClick={toggleSortOrder}>Сортувати по даті</SortByBtn>
          <FilterTasksBtns />
        </div>
        {tasks.length ? (
          <>
            <div className='grid grid-cols-2 max-md:grid-cols-1 gap-5 mb-10'>
              {tasks.map((task) => (
                <ProjectTaskItem key={task._id} task={task} />
              ))}
              {pageCount! > 1 ? (
                <Pagination
                  activePageNumber={pageNum}
                  pagesCount={pageCount!}
                />
              ) : null}
            </div>
          </>
        ) : (
          <ErrorMessage
            message='Наразі список задач порожній.'
            classNameModificator='bg-asidePanel p-3.5 text-center mt-5'
          />
        )}
      </div>
    </div>
  );
};

export default ProjectTasks;
