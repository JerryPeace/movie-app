import { GetListParams } from 'react-admin';
import { orderBy, toLower } from 'lodash';

export const sortList = <T>(list: Array<T>, params: GetListParams): Array<T> => {
  const { field, order } = params.sort;
  return orderBy(list, [field], [toLower(order) === 'desc' ? 'desc' : 'asc']);
};

export const pageList = <T>(list: Array<T>, params: GetListParams): Array<T> => {
  const { page, perPage } = params.pagination;
  return list.slice((page - 1) * perPage, page * perPage);
};

export const pageSortList = <T>(list: Array<T>, params: GetListParams): Array<T> =>
  pageList(sortList(list, params), params);
