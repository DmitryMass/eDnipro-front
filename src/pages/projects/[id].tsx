import { EditProjectForm } from '@/components/forms/EditProjectForm';
import { AddNewTaskIntoProject } from '@/components/page-components/project/AddNewTaskIntoProject';
import { FileActions } from '@/components/page-components/project/FileActions';
import { FilterTasksBtns } from '@/components/page-components/project/FilterTasksBtns';
import { OpenFile } from '@/components/page-components/project/OpenFile';
import { ProjectActions } from '@/components/page-components/project/ProjectActions';
import { ProjectTaskItem } from '@/components/page-components/project/ProjectTaskItem';
import BackBtn from '@/components/ui/BackBtn';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Pagination } from '@/components/ui/Pagination';
import { SortByBtn } from '@/components/ui/SortByBtn';
import { Title } from '@/components/ui/Title';
import { useSortBy } from '@/hooks/useSortBy';
import type { TProjectPart, TTask } from '@/types/types';
import { handleDeleteAction } from '@/utils/fetchFn';
import { ROUTE } from '@/utils/routes';
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
  // ctx.res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=120, max-age=120, stale-while-revalidate=59'
  // );

  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  const filteredStatus = ctx.query.filteredStatus
    ? ctx.query.filteredStatus
    : 'all';
  const url = ctx.query.sortBy
    ? `/project/${ctx.query.id}?page=${pageNum}&limit=6&sortBy=${ctx.query.sortBy}&filteredStatus=${filteredStatus}`
    : `/project/${ctx.query.id}?page=${pageNum}&limit=6&filteredStatus=${filteredStatus}`;

  try {
    const response = await axios.get(
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
  const [editProject, setEditProject] = useState<boolean>(false);
  const { toggleSortOrder } = useSortBy();
  const { handleDelete, isLoading } = handleDeleteAction(
    '/project',
    project._id,
    ROUTE.PROJECTS
  );

  return (
    <div>
      <BackBtn>Назад</BackBtn>
      <div className='flex justify-between items-center mb-2 max-sm:flex-col max-sm:items-start'>
        <Title classModificator='text-2xl text-grayStroke-90 font-medium max-sm:text-xl max-sm:mb-2'>
          Задачі проекту
        </Title>
        <AddNewTaskIntoProject />
      </div>
      <div className='rounded-sm p-2.5 bg-white shadow-md text-black mb-4 flex max-sm:flex-col max-sm:items-stretch gap-6'>
        <div className='grow'>
          {editProject ? (
            <EditProjectForm
              project={project}
              closeMenu={() => setEditProject(false)}
            />
          ) : (
            <>
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
            </>
          )}
          {project?.file ? (
            <>
              {isOpenFile ? (
                <OpenFile
                  setIsOpenFile={() => setIsOpenFile(false)}
                  fileName={project.file.file_originalName}
                  filePath={project.file.file_path}
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
        <ProjectActions
          isEdit={editProject}
          handleDelete={handleDelete}
          isLoading={isLoading}
          setIsEdit={() => setEditProject((prev) => !prev)}
        />
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
            </div>
            {pageCount! > 1 ? (
              <Pagination activePageNumber={pageNum} pagesCount={pageCount!} />
            ) : null}
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
