import { useState, type FC } from 'react';

import { Loader } from '../ui/Loader';
import clsx from 'clsx';
import { useSignIn } from '@/hooks/useSignIn';

export const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const { loginFormSubmit, register, handleSubmit, errors, isSubmitting } =
    useSignIn();

  const handleRegistration = async (data: any) => {
    console.log(data, 'register test');
  };

  return (
    <div className='relative max-w-loginContainer mx-auto w-full px-6 text-black py-10 h-[370px] bg-grayStroke-100 bg-opacity-[0.05] rounded-md border border-grayStroke-80'>
      <div className='text-center border-b border-grayStroke-100 border-opacity-20 pb-5 mb-7'>
        <h3 className='mb-2 font-semibold text-2xl'>Увійти</h3>
        <p className='text-sm16 text-grayStroke-70'>
          Почніть творити неймовірні речі
        </p>
      </div>
      <form
        onSubmit={
          isLogin
            ? handleSubmit(loginFormSubmit)
            : handleSubmit(handleRegistration)
        }
      >
        <div className='flex flex-col justify-center items-stretch gap-6'>
          <label className='relative'>
            <input
              className={clsx(
                'w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20',
                errors.email ? 'border-mainRed outline-mainRed' : null
              )}
              type='email'
              placeholder='Email Address'
              {...register('email', {
                required: 'Email is required!',
                pattern: {
                  value: /^[a-zA-Z0-9@.]+$/,
                  message: 'Only English letters and numbers, and no spaces.',
                },
              })}
            />
            {errors.email ? (
              <span className='absolute left-1 -top-3 text-mainRed text-xs10'>
                * {errors.email.message}
              </span>
            ) : null}
          </label>
          <label className='relative'>
            <input
              className={clsx(
                'w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20',
                errors.password ? 'border-mainRed outline-mainRed' : null
              )}
              type='password'
              placeholder='Password'
              {...register('password', {
                required: 'Password is required!',
                minLength: {
                  value: 6,
                  message: 'Password should be at least 6 chars',
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Only English letters and numbers, and no spaces.',
                },
              })}
            />
            {errors.password ? (
              <span className='absolute left-1 -top-3 text-mainRed text-xs10'>
                * {errors.password.message}
              </span>
            ) : null}
          </label>
          <button
            disabled={isSubmitting}
            type='submit'
            className='bg-mainBlue text-white text-sm14 hover:bg-blueHover transition-all duration-200 flex justify-center items-center w-full font-semibold text-sm16 rounded-[0.25rem] border border-transparent py-1.5 px-4'
          >
            {isSubmitting ? <Loader /> : isLogin ? 'Увійти' : 'Зареєструватися'}
          </button>
          <span
            onClick={() => setIsLogin((prev) => !prev)}
            className='w-full block text-center text-s14 text-mainBLue cursor-pointer select-none hover:text-btnBlueHover'
          >
            {isLogin ? 'Перейти до реєстрації' : 'Перейти до входу'}
          </span>
        </div>
      </form>
    </div>
  );
};
