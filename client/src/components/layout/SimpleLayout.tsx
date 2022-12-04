import { LayoutProps, SkipNavigationButton } from 'react-admin';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import ErrorBoundaryContainer from './ErrorBoundary';
import SimpleAppBar from './SimpleAppBar';

/**
 * SimpleLayout is a simplifed version of the react-admin Layout component. It changes the
 * followings:
 * * removing the MainMenu
 * * use SimpleAppBar as the default AppBar
 * @param {LayoutProps} props
 * @returns
 */
export const SimpleLayout = (props: LayoutProps) => {
  const {
    appBar: AppBar = SimpleAppBar,
    children,
    className,
    error: errorComponent,
    title,
    ...rest
  } = props;

  return (
    <StyledLayout className={clsx('layout', className)} {...rest}>
      <SkipNavigationButton />
      <div className={LayoutClasses.appFrame}>
        <AppBar title={title} />
        <div id="main-content" className={LayoutClasses.content}>
          <ErrorBoundaryContainer error={errorComponent} title={title}>
            {children}
          </ErrorBoundaryContainer>
        </div>
      </div>
    </StyledLayout>
  );
};

const PREFIX = 'EmqLayout';
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

  [`& .${LayoutClasses.appFrame}`]: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(7),
    },
  },
  [`& .${LayoutClasses.content}`]: {
    backgroundColor: theme.palette.background.default,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: 0,
    [theme.breakpoints.up('xs')]: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
}));

export default SimpleLayout;
