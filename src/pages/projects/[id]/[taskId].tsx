import { BindTaskToUser } from '@/components/page-components/project/BindTaskToUser';
import { ChangeStatusBtn } from '@/components/page-components/project/ChangeStatusBtn';
import { FileActions } from '@/components/page-components/project/FileActions';
import { OpenFile } from '@/components/page-components/project/OpenFile';
import { ProjectActions } from '@/components/page-components/project/ProjectActions';
import { TaskPerfomingBy } from '@/components/page-components/project/TaskPerfomingBy';
import { TaskStatus } from '@/components/page-components/project/TaskStatus';
import BackBtn from '@/components/ui/BackBtn';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Title } from '@/components/ui/Title';
import type { TTask } from '@/types/types';
import { handleDeleteAction } from '@/utils/fetchFn';
import { ROUTE } from '@/utils/routes';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { FC, useState } from 'react';

type TTaskProps = {
  task: TTask | null;
  error?: string;
};

export const getServerSideProps: GetServerSideProps<TTaskProps> = async (
  ctx
) => {
  const session = await getSession(ctx);
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, max-age=120, stale-while-revalidate=59'
  );

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/task/${ctx.query.taskId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );

    return {
      props: {
        task: response.data,
      },
    };
  } catch (err: any) {
    return {
      props: {
        task: null,
        error: err?.response?.data?.error
          ? err.response.data.error
          : 'Internal server error. Try later.',
      },
    };
  }
};

const TaskPage: FC<TTaskProps> = ({ task, error }) => {
  if (error || !task) {
    return (
      <ErrorMessage
        message={error ? error : 'Завдання не знайдено'}
        classNameModificator='bg-asidePanel p-3.5 text-center mt-5'
      />
    );
  }
  const session = useSession();
  const [isOpenFile, setIsOpenFile] = useState<boolean>(false);
  const [editTask, setIsEdit] = useState<boolean>(false);
  const { handleDelete, isLoading } = handleDeleteAction(
    '/task/delete',
    task._id as string,
    `${ROUTE.PROJECTS}/${task.projectId}`
  );

  console.log(session.data?.user.id === task.perfomingBy._id);
  return (
    <div>
      <BackBtn>Назад</BackBtn>
      <Title classModificator='text-2xl mb-2 text-grayStroke-90 font-medium max-sm:text-xl'>
        Задача
      </Title>
      <div className='rounded-sm p-2.5 bg-white shadow-md text-black mb-4 flex max-sm:flex-col max-sm:items-stretch gap-4'>
        <div className='grow'>
          {editTask ? (
            <></>
          ) : (
            <>
              <h2 className='text-black mb-4 text-xl font-medium max-sm:text-s14'>
                <span className='text-s14 font-normal max-sm:text-xs12'>
                  Назва задачі:
                </span>{' '}
                <br />
                {task.title}
              </h2>
              <p className='text-black font-medium max-sm:text-s14 max-w-5xl w-full mb-4'>
                <span className='text-s14 font-normal max-sm:text-xs12'>
                  Опис задачі:
                </span>{' '}
                <br />
                {task.description}
              </p>
            </>
          )}
          {task.file ? (
            <>
              {isOpenFile ? (
                <OpenFile
                  setIsOpenFile={() => setIsOpenFile(false)}
                  fileName={task.file.file_originalName}
                  filePath={task.file.file_path}
                />
              ) : null}
              <FileActions
                fileName={task.file.file_originalName}
                filePath={task.file.file_path}
                setIsOpen={() => setIsOpenFile(true)}
              />
            </>
          ) : null}

          {task.perfomingBy ? (
            <div className='flex justify-start flex-col items-start pt-3 gap-2'>
              <TaskStatus status={task.status} />
              <TaskPerfomingBy user={task.perfomingBy} status={task.status} />
              {task.perfomingBy._id === session.data?.user.id ? (
                <div>
                  <ChangeStatusBtn
                    changeStatus='isopen'
                    taskId={task._id}
                    status={task.status}
                  >
                    Відати задачу
                  </ChangeStatusBtn>
                  <ChangeStatusBtn
                    changeStatus='isclosed'
                    taskId={task._id}
                    status={task.status}
                  >
                    Закрити задачу
                  </ChangeStatusBtn>
                </div>
              ) : null}
            </div>
          ) : (
            <div className='flex justify-start flex-col items-start pt-3'>
              <TaskStatus
                status={task.status}
                classNameModificator='text-right'
              />
              <BindTaskToUser taskId={task._id} />
            </div>
          )}
        </div>
        <ProjectActions
          isEdit={editTask}
          handleDelete={handleDelete}
          isLoading={isLoading}
          setIsEdit={() => setIsEdit((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default TaskPage;
