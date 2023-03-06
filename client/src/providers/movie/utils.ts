import { GetListParams } from 'react-admin';
import { orderBy, toLower, reduce, keys } from 'lodash';

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

export const filterList = <T extends object>(
  list: Array<T>,
  params: GetListParams,
  filterField: string
): Array<T> =>
  reduce(
    keys(params.filter),
    (prev: T[], filterKey: string): T[] => {
      const filterValue = params.filter[filterKey];
      return prev.filter((item) => {
        const field = item[filterField as keyof T];
        return typeof field === 'string' && field.indexOf(filterValue) > -1;
      });
    },
    list
  );
