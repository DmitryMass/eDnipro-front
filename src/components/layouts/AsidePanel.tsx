import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import { Logo } from '../ui/Logo';
import { Logout } from '../ui/Logout';
import { AsideNav } from './AsideNav';
import { AddNewProject } from '../ui/AddNewProject';
import { MainButton } from '../ui/MainButton';
import { AddNewProjectForm } from '../forms/AddNewProjectForm';

export const AsidePanel: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (!session.data?.user) {
    return null;
  }

  return (
    <>
      <aside
        className={clsx(
          'w-aside h-screen bg-asidePanel p-6 sticky top-0 left-0 max-lg:hidden'
        )}
      >
        <div>
          <div className='flex justify-between items-center mb-24'>
            <Logo />
            <Logout />
          </div>
          <AsideNav />
          <AddNewProject />
        </div>
      </aside>

      <header className='w-full bg-asidePanel sticky top-0 py-3 lg:hidden z-20'>
        <div className='max-w-7xl mx-auto px-3.5 w-full'>
          <div className='flex justify-between items-center'>
            <Logo />
            <div className='flex items-center gap-3'>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className='flex justify-center items-center border-2 border-opacity-30 py-1 px-3 border-grayStroke-100 rounded-sm'
              >
                <img
                  className='w-6 h-6 opacity-80'
                  src='/icons/burger-icon.svg'
                  alt='menu'
                />
              </button>
              <Logout />
            </div>
          </div>
          <div className='relative'>
            <div
              className={clsx(
                isMenuOpen ? 'h-[250px] pt-6' : 'h-0 pt-0',
                'w-full mx-auto px-3.5 transform transition-all duration-300 max-w-headerContainer bg-asidePanel overflow-hidden'
              )}
            >
              <AsideNav closeMenu={() => setIsMenuOpen(false)} />
              <MainButton
                type='button'
                classModificator='bg-black transition-all duration-200 rounded-sm font-normal text-lightMain hover:bg-opacity-60'
                onClick={() => setIsModalOpen((prev) => !prev)}
              >
                Новий проект +
              </MainButton>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            'w-full h-full fixed inset-0 bg-asidePanel flex justify-center bg-opacity-90 items-center z-20 transition-all duration-300 px-2.5',
            isModalOpen ? '-translate-y-0' : '-translate-y-full'
          )}
        >
          <div className='max-w-xl w-full mx-auto bg-grayStroke-50 rounded-md p-4 shadow-md relative'>
            <AddNewProjectForm
              closeModal={() => setIsModalOpen((prev) => !prev)}
            />
          </div>
        </div>
      </header>
    </>
  );
};
