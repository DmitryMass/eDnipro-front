import { type FC } from 'react';

type TErrorMessage = {
  message: string;
  classNameModificator?: string;
};

export const ErrorMessage: FC<TErrorMessage> = ({
  message,
  classNameModificator,
}) => {
  return <div className={classNameModificator}>{message}</div>;
};
