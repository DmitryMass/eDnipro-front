import { ProjectTaskItem } from '@/components/page-components/project/ProjectTaskItem';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { SortByBtn } from '@/components/ui/SortByBtn';
import { Title } from '@/components/ui/Title';
import { useSortBy } from '@/hooks/useSortBy';
import type { TProjectPart, TTask } from '@/types/types';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { type FC } from 'react';

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
  if (error) {
    return (
      <ErrorMessage
        message={error}
        classNameModificator='bg-asidePanel p-3.5 text-center mt-5'
      />
    );
  }

  const { toggleSortOrder } = useSortBy();

  return (
    <div>
      <Title classModificator='text-2xl mb-2 text-grayStroke-90 font-medium max-sm:text-xl'>
        Задачі проекту
      </Title>
      <div className='rounded-sm p-2.5 max-sm:p-1 bg-white shadow-md text-black mb-4'>
        PROJECT DATA (WITH UPDATE AND DELETE)
      </div>
      <div>
        {tasks.length ? (
          <>
            <div className='mb-4 flex items-center gap-2'>
              <SortByBtn onClick={toggleSortOrder}>Сортувати по даті</SortByBtn>
              <p className='text-black'>Тут буде філтрування по категоріям</p>
            </div>
            <div>
              {tasks.map((task) => (
                <ProjectTaskItem key={task._id} task={task} />
              ))}
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
