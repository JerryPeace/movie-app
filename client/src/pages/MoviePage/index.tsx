import { useState } from 'react';
import { Datagrid, FunctionField, SearchInput, TextField, useListContext } from 'react-admin';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FullListBase from 'components/FullListBase';
import MovieDetail from './MovieDetail';
import { sort, pagination, defaultPageOptions } from './constants';

const MovieList = (): JSX.Element => {
  const { isLoading } = useListContext();
  // movieContext is also a flag for drawer open prop
  const [movieContext, setMovieContext] = useState();
  const handleClose = () => {
    setMovieContext(undefined);
  };
  return (
    <Box display="flex">
      <FullListBase
        isLoading={isLoading}
        openDrawer={!!movieContext}
        defaultPageOptions={defaultPageOptions}
        perPage={pagination.perPage}
        title="Movie"
        actions={false}
        sort={sort}
        filters={[
          <SearchInput
            onChange={() => {
              setMovieContext(undefined);
            }}
            key="q"
            source="q"
            placeholder="Search Movie"
            alwaysOn
          />,
        ]}
      >
        <Datagrid bulkActionButtons={false}>
          <TextField source="film" label="Film" />
          <TextField source="genre" label="Genre" />
          <TextField source="year" label="Year Release" />
          <FunctionField
            source="create"
            label=""
            render={(record: any) => (
              <Button
                sx={{
                  '& span.MuiButton-startIcon': {
                    marginRight: '4px',
                  },
                }}
                size="small"
                variant="text"
                startIcon={<RemoveRedEyeIcon />}
                onClick={() => {
                  setMovieContext(record.id);
                }}
              >
                View Detail
              </Button>
            )}
          />
        </Datagrid>
      </FullListBase>
      <Drawer variant="persistent" open={!!movieContext} anchor="right" sx={{ zIndex: 100 }}>
        {movieContext && <MovieDetail movieID={movieContext} onClose={handleClose} />}
      </Drawer>
    </Box>
  );
};

export default MovieList;
