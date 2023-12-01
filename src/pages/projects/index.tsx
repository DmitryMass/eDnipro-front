import { ProjectItem } from '@/components/page-components/project/ProjectItem';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Title } from '@/components/ui/Title';
import type { TProjectResponse } from '@/types/responses';
import type { TProject } from '@/types/types';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { type FC } from 'react';

type TProjectProps = {
  itemsPerPage: TProject[];
  pageNum: number;
  total: number;
  error?: any;
};

export const getServerSideProps: GetServerSideProps<TProjectProps> = async (
  ctx
) => {
  const session = await getSession(ctx);

  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  try {
    const response: TProjectResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/project?page=${pageNum}&limit=6`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );

    return {
      props: {
        itemsPerPage: response.data.itemsPerPage,
        pageNum,
        total: response.data.total,
      },
    };
  } catch (err: any) {
    return {
      props: {
        itemsPerPage: [],
        pageNum,
        total: 1,
        error: err?.response?.data?.error
          ? err.response.data.error
          : 'Internal server error. Try later.',
      },
    };
  }
};

const Projects: FC<TProjectProps> = ({
  itemsPerPage,
  pageNum,
  total,
  error,
}) => {
  if (error) {
    return (
      <ErrorMessage
        message={error}
        classNameModificator='bg-asidePanel p-3.5 text-center mt-5'
      />
    );
  }
  return (
    <div className='py-10'>
      <Title classModificator='text-2xl mb-4 text-grayStroke-90 font-medium'>
        Проекти
      </Title>
      {itemsPerPage.length ? (
        <>
          <div className='grid grid-cols-2 max-md:grid-cols-1 gap-5 mb-5'>
            {itemsPerPage.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </div>
          <div className='text-black text-center'>PAGINATION WITH BUTTONS </div>
        </>
      ) : (
        <div className='text-black'>Project list empty</div>
      )}
    </div>
  );
};

export default Projects;
