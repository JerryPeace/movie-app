import { LayoutProps } from 'react-admin';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import ErrorBoundaryContainer from './ErrorBoundary';
/**
 * EmptyLayout removes everything:
 * * removing the MainMenu
 * * removing the AppBar
 * @param {LayoutProps} props
 * @returns
 */
export const EmptyLayout = (props: LayoutProps) => {
  const { children, className, error: errorComponent, title, ...rest } = props;

  return (
    <StyledLayout className={clsx('layout', className)} {...rest}>
      <div className={LayoutClasses.appFrame}>
        <div id="main-content" className={LayoutClasses.content}>
          <ErrorBoundaryContainer error={errorComponent} title={title}>
            {children}
          </ErrorBoundaryContainer>
        </div>
      </div>
    </StyledLayout>
  );
};

const PREFIX = 'emqEmptyLayout';
export const LayoutClasses = {
  appFrame: `${PREFIX}-appFrame`,
  content: `${PREFIX}-content`,
};

const StyledLayout = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  minWidth: 'fit-content',
  width: '100%',
  color: theme.palette.getContrastText(theme.palette.background.default),
  [`& .${LayoutClasses.content}`]: {
    backgroundColor: theme.palette.background.default,
    zIndex: 2,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
}));

export default EmptyLayout;
