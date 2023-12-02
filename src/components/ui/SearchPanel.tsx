import { useDebounceValue } from '@/hooks/useDebounceValue';
import type { TProject } from '@/types/types';
import { ROUTE } from '@/utils/routes';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, type FC, useEffect } from 'react';

const foundProjectsCache: Record<string, TProject[]> = {
  '': [],
};

export const SearchPanel: FC = () => {
  const { data: session } = useSession();
  const [query, setQuery] = useState('');
  const [foundProjects, setFoundProjects] = useState<TProject[]>([]);
  const debauncedString = useDebounceValue(query, 500);

  useEffect(() => {
    const controller = new AbortController();
    const searchHandler = async () => {
      if (debauncedString.trim()) {
        if (!foundProjectsCache[debauncedString]) {
          const res = await axios.get(
            `${
              process.env.NEXT_PUBLIC_DATABASE_URL
            }/project/search/by?q=${debauncedString.trim()}`,
            {
              signal: controller.signal,
              headers: {
                Authorization: `Bearer ${session?.user.token}`,
              },
            }
          );
          const results = res.data;

          foundProjectsCache[debauncedString] = results;
          setFoundProjects(results);
        } else {
          setFoundProjects(foundProjectsCache[debauncedString]);
        }
      } else {
        setFoundProjects(foundProjectsCache['']);
      }
    };
    searchHandler();
    return () => controller.abort();
  }, [debauncedString]);

  return (
    <div className='max-w-[450px] w-full relative mb-4'>
      <label
        className='realtive flex w-full flex-col gap-[5px] font-medium text-[14px]'
        htmlFor='search'
      >
        <input
          className='w-full py-1.5 pl-3.5 pr-8 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20 text-black'
          id='search'
          type='text'
          placeholder='Пошук проектів'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <img
          className='absolute right-2.5 w-5 h-5 top-1.5'
          src='/icons/search-icon.svg'
          alt='search'
        />
      </label>
      {foundProjects.length > 0 && (
        <div className='absolute top-[35px] p-2 left-0 w-full shadow-md bg-white block rounded-md border-[1px] border-grayStroke-100 max-h-[250px] overflow-auto z-10'>
          {foundProjects.map((project) => (
            <Link
              key={project._id}
              className='block text-black hover:bg-grayStroke-30 px-2 py-1 text-s14'
              href={`${ROUTE.PROJECTS}/${project._id}`}
            >
              {project.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
