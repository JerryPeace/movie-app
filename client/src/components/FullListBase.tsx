import { ReactElement } from 'react';
import { List, ListProps, Pagination } from 'react-admin';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import blue from '@mui/material/colors/blue';
import Loading from './Loading';

/**
 * Use this componet to wrap Datagrid if you want to render full screen list
 *
 * @example
 * import { Datagrid, TextField } from 'react-admin';
 * import FullListBase from "components/FullListBase";
 *
 * <FullListBase title="title" />
 *  <Datagrid>
 *   <TextField source="code" label="Partner Code" />
 *  </Datagrid>
 * </FullListBase />
 */

const FullListBase = ({
  isLoading,
  children,
  defaultPageOptions,
  openDrawer,
  sx,
  ...rest
}: FullListBaseProps): ReactElement => {
  const pagination = defaultPageOptions && (
    <Pagination
      rowsPerPageOptions={defaultPageOptions}
      sx={{ '&.MuiTablePagination-root': { overflow: 'unset' } }}
    />
  );

  return isLoading ? (
    <Loading />
  ) : (
    <StyledList
      pagination={pagination}
      sx={{ marginRight: openDrawer ? '420px' : 0, ...sx }}
      {...rest}
    >
      <Box sx={{ height: '100%', width: '100%', overflow: 'auto' }}>{children}</Box>
    </StyledList>
  );
};

interface FullListBaseProps extends ListProps {
  isLoading: boolean;
  defaultPageOptions?: Array<number>;
  openDrawer?: boolean;
}

const StyledList = styled(List)(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create(['all'], {
    duration: theme.transitions.duration.enteringScreen,
  }),
  '& .RaList-main': {
    height: `calc(100vh - ${theme.spacing(8)})`,
  },
  '& .RaList-content': {
    overflow: 'auto',
    '& > div > div > .RaDatagrid-tableWrapper > .RaDatagrid-table > thead.RaDatagrid-thead > tr > th':
      {
        backgroundColor: theme.palette?.mode === 'dark' ? blue[900] : blue[100],
      },
  },
}));

export default FullListBase;
