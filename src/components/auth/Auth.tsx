import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';
import { useState, type FC } from 'react';
import { Loader } from '../ui/Loader';
import { MainButton } from '../ui/MainButton';

export const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    loginFormSubmit,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleRegistration,
  } = useAuth({ setIsLogin: () => setIsLogin((prev) => !prev) });

  return (
    <div className='relative max-w-loginContainer mx-auto w-full px-6 text-black py-10 h-[390px] bg-grayStroke-100 bg-opacity-[0.05] rounded-md border border-grayStroke-80'>
      <div className='text-center border-b border-grayStroke-100 border-opacity-20 pb-5 mb-7'>
        <h3 className='mb-2 font-semibold text-2xl'>
          {isLogin ? 'Увійти' : 'Зареєструватися'}
        </h3>
        <p className='text-sm16 text-grayStroke-70'>
          {isLogin
            ? ' Почніть творити неймовірні речі'
            : 'Зареєструйте особистий обліковий запис у два кліки'}
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
              placeholder='Ваша пошта'
              {...register('email', {
                required: `Пошта обов'язкове поле`,
                pattern: {
                  value: /^[a-zA-Z0-9@.]+$/,
                  message: 'Тільки англійські літери, цифри без пробілів.',
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
                required: `Пароль обов'язкове поле`,
                minLength: {
                  value: 6,
                  message: 'Мінімум 6 символів',
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Тільки англійські літери, цифри без пробілів.',
                },
              })}
            />
            {errors.password ? (
              <span className='absolute left-1 -top-3 text-mainRed text-xs10'>
                * {errors.password.message}
              </span>
            ) : null}
          </label>
          <MainButton type='submit' disabled={isSubmitting}>
            {isSubmitting ? <Loader /> : isLogin ? 'Увійти' : 'Зареєструватися'}
          </MainButton>
          <span
            onClick={() => setIsLogin((prev) => !prev)}
            className='w-full block text-center text-s14 text-slate-800 cursor-pointer select-none hover:text-black'
          >
            {isLogin ? 'Перейти до реєстрації' : 'Перейти до входу'}
          </span>
        </div>
      </form>
    </div>
  );
};
