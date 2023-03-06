import {
  CreateParams,
  DataProvider,
  GetListParams,
  GetListResult,
  GetOneParams,
  GetOneResult,
  RaRecord,
} from 'react-admin';
import { pageSortList, filterList } from './utils';
import { BASE_URL } from './constants';

export const provider: DataProvider = {
  getList: async <T extends RaRecord = RaRecord>(
    resource: string,
    params: GetListParams
  ): Promise<GetListResult<T>> => {
    const response = await fetch(`${BASE_URL}/movies`);
    const data = await response.json();
    return {
      data: pageSortList(filterList(data, params, 'film'), params),
      total: data.length,
    };
  },
  getMany: async () => Promise.reject(),
  getOne: async <T extends RaRecord>(
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult<T>> => {
    const response = await fetch(`${BASE_URL}/movies/${params.id}`);
    const data = await response.json();
    return { data };
  },
  getManyReference: async () => Promise.reject(),
  create: async (resource: string, params: CreateParams) => {
    try {
      await fetch(`${BASE_URL}/movies/${params.data.id}/comments`, {
        method: 'POST',
        body: JSON.stringify(params.data.comments),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.log('Error: ', error);
    }
    return { data: params.data };
  },
  update: async () => Promise.reject(),
  updateMany: async () => Promise.reject(),
  delete: async () => Promise.reject(),
  deleteMany: async () => Promise.reject(),
};

export default provider;
