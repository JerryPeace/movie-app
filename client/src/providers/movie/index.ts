import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from 'react-admin';
import { resourceName } from '../../pages/MoviePage/constants';
import movieProvider from './movieProvider';

const RESOURCE_MAP: { [key: string]: DataProvider } = {
  [resourceName]: movieProvider,
};

export const DefaultDataProvider: DataProvider = {
  getList: async <RecordType extends RaRecord>(
    resource: string,
    params: GetListParams
  ): Promise<GetListResult<RecordType>> => {
    if (RESOURCE_MAP[resource]) {
      return RESOURCE_MAP[resource].getList(resource, params);
    } else {
      return Promise.reject();
    }
  },
  getMany: async <RecordType extends RaRecord>(
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<RecordType>> => {
    if (RESOURCE_MAP[resource]) {
      return RESOURCE_MAP[resource].getMany(resource, params);
    } else {
      return Promise.reject();
    }
  },
  getOne: async <RecordType extends RaRecord>(
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult<RecordType>> => {
    if (RESOURCE_MAP[resource]) {
      return RESOURCE_MAP[resource].getOne(resource, params);
    } else {
      return Promise.reject();
    }
  },
  getManyReference: async <RecordType extends RaRecord>(
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<RecordType>> => {
    if (RESOURCE_MAP[resource]) {
      return RESOURCE_MAP[resource].getManyReference(resource, params);
    } else {
      return Promise.reject();
    }
  },
  create: async <RecordType extends RaRecord>(
    resource: string,
    params: CreateParams
  ): Promise<CreateResult<RecordType>> => {
    if (RESOURCE_MAP[resource]) {
      return RESOURCE_MAP[resource].create(resource, params);
    } else {
      return Promise.reject();
    }
  },
  update: async <RecordType extends RaRecord>(
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult<RecordType>> => {
    if (RESOURCE_MAP[resource]) {
      return RESOURCE_MAP[resource].update(resource, params);
    } else {
      return Promise.reject();
    }
  },
  updateMany: async (resource: string, params: UpdateManyParams): Promise<UpdateManyResult> => {
    if (RESOURCE_MAP[resource]) {
      return RESOURCE_MAP[resource].updateMany(resource, params);
    } else {
      return Promise.reject();
    }
  },
  delete: async <RecordType extends RaRecord>(
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult<RecordType>> => {
    if (RESOURCE_MAP[resource]) {
      return RESOURCE_MAP[resource].delete(resource, params);
    } else {
      return Promise.reject();
    }
  },
  deleteMany: async (resource: string, params: DeleteManyParams): Promise<DeleteManyResult> => {
    if (RESOURCE_MAP[resource]) {
      return RESOURCE_MAP[resource].deleteMany(resource, params);
    } else {
      return Promise.reject();
    }
  },
};
