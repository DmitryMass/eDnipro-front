import type { TUser } from '@/types/types';
import { convertAuthorName } from '@/utils/convertAuthorName';
import type { FC } from 'react';

type TTaskPerfomingByProps = {
  user: TUser;
  classNameModificator?: string;
  status: string;
};

export const TaskPerfomingBy: FC<TTaskPerfomingByProps> = ({
  user,
  classNameModificator,
  status,
}) => {
  const { longAuthor, shortAuthor } = convertAuthorName(
    user.firstName,
    user.lastName,
    user.email
  );
  return (
    <div className={classNameModificator}>
      <p className='text-xs12 text-black font-medium'>
        {status === 'inprogress' ? 'Ким виконується:' : 'Xто виконав:'}
      </p>
      <span
        className='inline-block text-white px-1 rounded-sm font-normal text-s14 max-sm:text-xs12 max-md:hidden'
        style={{ backgroundColor: user.userBackground }}
      >
        {longAuthor}
      </span>
      <span
        className='inline-block text-white px-1 rounded-sm font-normal text-s14 max-sm:text-xs12 md:hidden'
        style={{ backgroundColor: user.userBackground }}
      >
        {shortAuthor}
      </span>
    </div>
  );
};
