import { ProjectItem } from '@/components/page-components/project/ProjectItem';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Pagination } from '@/components/ui/Pagination';
import { SortByBtn } from '@/components/ui/SortByBtn';
import { Title } from '@/components/ui/Title';
import { useSortBy } from '@/hooks/useSortBy';
import type { TProjectResponse } from '@/types/responses';
import type { TProject } from '@/types/types';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FC } from 'react';

type TProjectProps = {
  itemsPerPage: TProject[];
  pageCount?: number;
  error?: any;
  pageNum: number;
};

export const getServerSideProps: GetServerSideProps<TProjectProps> = async (
  ctx
) => {
  const session = await getSession(ctx);
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, max-age=120, stale-while-revalidate=59'
  );

  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  const url = ctx.query.sortBy
    ? `/project?page=${pageNum}&limit=6&sortBy=${ctx.query.sortBy}`
    : `/project?page=${pageNum}&limit=6`;
  try {
    const response: TProjectResponse = await axios.get(
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
        itemsPerPage: response.data.itemsPerPage,
        pageCount,
        pageNum,
      },
    };
  } catch (err: any) {
    return {
      props: {
        itemsPerPage: [],
        pageNum,
        error: err?.response?.data?.error
          ? err.response.data.error
          : 'Internal server error. Try later.',
      },
    };
  }
};

const Projects: FC<TProjectProps> = ({
  itemsPerPage,
  error,
  pageNum,
  pageCount,
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
        Проекти
      </Title>
      <SortByBtn onClick={toggleSortOrder}>Сортувати по даті</SortByBtn>
      {itemsPerPage.length && pageCount ? (
        <>
          <div className='grid grid-cols-2 max-md:grid-cols-1 gap-5 mb-10'>
            {itemsPerPage.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </div>
          {pageCount > 1 ? (
            <Pagination activePageNumber={pageNum} pagesCount={pageCount} />
          ) : null}
        </>
      ) : (
        <div className='text-black'>Project list empty</div>
      )}
    </div>
  );
};

export default Projects;
