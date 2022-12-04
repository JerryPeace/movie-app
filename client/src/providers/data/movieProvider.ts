import {
  CreateParams,
  DataProvider,
  GetListParams,
  GetListResult,
  GetOneParams,
  GetOneResult,
  RaRecord,
} from 'react-admin';
import MovieDB from '../../indexedDB';
import { pageSortList } from './utils';

const movieDB = new MovieDB('movie');
(async () => {
  await movieDB.initDB();
})();

export const provider: DataProvider = {
  getList: async <MovieObject extends RaRecord>(
    resource: string,
    params: GetListParams
  ): Promise<GetListResult<MovieObject>> => {
    const movies: MovieObject[] = (await movieDB.getMovies(
      params.filter.q
    )) as unknown as MovieObject[];
    return {
      data: pageSortList(movies, params),
      total: movies.length,
    };
  },
  getMany: async () => Promise.reject(),
  getOne: async <MovieObject extends RaRecord>(
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult<MovieObject>> => {
    const data: MovieObject = (await movieDB.getMovieByID(params.id)) as unknown as MovieObject;
    return { data };
  },
  getManyReference: async () => Promise.reject(),
  create: async (resource: string, params: CreateParams) => {
    await movieDB.updateMovies([params.data]);
    return { data: params.data };
  },
  update: async () => Promise.reject(),
  updateMany: async () => Promise.reject(),
  delete: async () => Promise.reject(),
  deleteMany: async () => Promise.reject(),
};

export default provider;
