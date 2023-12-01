import { TProject } from './types';

export type TProjectResponse = {
  data: {
    itemsPerPage: TProject[];
    total: number;
  };
};
