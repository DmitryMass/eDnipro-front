import { formatDistance } from 'date-fns';

export const convertDynamicDate = (createdAt: string, updatedAt: string) => {
  return {
    formattedDynamicCreatedAt: formatDistance(new Date(), new Date(createdAt)),
    formattedDynamicUpdatedAt: formatDistance(new Date(), new Date(updatedAt)),
  };
};
