import { formatDistance, format } from 'date-fns';

export const convertDynamicDate = (createdAt: string, updatedAt: string) => {
  return {
    formattedDynamicCreatedAt: formatDistance(new Date(), new Date(createdAt)),
    formattedDynamicUpdatedAt: formatDistance(new Date(), new Date(updatedAt)),
  };
};

export const convertDate = (createdAt: string, updatedAt: string) => {
  return {
    formattedCreatedAt: format(new Date(createdAt), 'dd-MM-yyyy HH:mm'),
    formattedUpdatedAt: format(new Date(updatedAt), 'dd-MM-yyyy HH:mm'),
  };
};
