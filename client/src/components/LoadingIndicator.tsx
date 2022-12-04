import { useCallback } from 'react';
import { useLoading, useRefresh } from 'react-admin';
import clsx from 'clsx';
import { useTheme, styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Refresh from '@mui/icons-material/Refresh';

const LoadingIndicator = (props: any) => {
  const refresh = useRefresh();
  const loading = useLoading();
  const theme = useTheme();
  const handleClick = useCallback(() => {
    refresh();
  }, [refresh]);

  return (
    <Root>
      {loading ? (
        <CircularProgress
          className={clsx('app-loader', LoadingIndicatorClasses.loader)}
          color="inherit"
          size={theme.spacing(2)}
          thickness={6}
          {...props}
        />
      ) : (
        <Tooltip title="Refresh">
          <IconButton
            aria-label="Refresh"
            color="inherit"
            onClick={handleClick}
            {...props}
            size="large"
          >
            <Refresh />
          </IconButton>
        </Tooltip>
      )}
    </Root>
  );
};

const PREFIX = 'RaLoadingIndicator';

export const LoadingIndicatorClasses = {
  loader: `${PREFIX}-loader`,
  loadedIcon: `${PREFIX}-loadedIcon`,
};

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${LoadingIndicatorClasses.loader}`]: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },

  [`& .${LoadingIndicatorClasses.loadedIcon}`]: {},
}));

export default LoadingIndicator;
