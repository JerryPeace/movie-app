import { Children, memo } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  SxProps,
  Toolbar,
  Typography,
  useMediaQuery,
  Theme,
} from '@mui/material';
import {
  AppBarProps,
  defaultTheme,
  HideOnScroll,
  RaThemeOptions,
  ToggleThemeButton,
} from 'react-admin';
import LoadingIndicator from '../LoadingIndicator';

const darkTheme: RaThemeOptions = {
  palette: { mode: 'dark' },
};

const sx: SxProps<Theme> = {
  '&': {
    display: 'inline-block',
    marginLeft: 2,
  },
};

/**
 * SimpleAppBar is a simplifed react-admin AppBar. It removes features from react-admin AppBar:
 * * no hamburger button for main menu
 * * no user menu
 * @param {AppBarProps} props
 * @returns
 */
export const SimpleAppBar = (props: AppBarProps) => {
  const {
    children,
    className,
    color = 'secondary',
    container: Container = HideOnScroll,
    // pick open, title, userMenu out to prevent polluting AppBar
    open,
    title,
    userMenu,
    ...rest
  } = props;

  const isXSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  return (
    <Container className={className}>
      <StyledAppBar className={AppBarClasses.appBar} color={color} {...rest}>
        <Toolbar
          disableGutters
          variant={isXSmall ? 'regular' : 'dense'}
          className={AppBarClasses.toolbar}
        >
          {Children.count(children) === 0 ? (
            <div className={AppBarClasses.title}>
              <Typography sx={sx} variant="h6" color="inherit" id="react-admin-title" />
            </div>
          ) : (
            children
          )}
          <ToggleThemeButton lightTheme={defaultTheme} darkTheme={darkTheme} />
          <LoadingIndicator />
        </Toolbar>
      </StyledAppBar>
    </Container>
  );
};

const PREFIX = 'EmqAppBar';

export const AppBarClasses = {
  appBar: `${PREFIX}-appBar`,
  toolbar: `${PREFIX}-toolbar`,
  menuButton: `${PREFIX}-menuButton`,
  menuButtonIconClosed: `${PREFIX}-menuButtonIconClosed`,
  menuButtonIconOpen: `${PREFIX}-menuButtonIconOpen`,
  title: `${PREFIX}-title`,
};

const StyledAppBar = styled(MuiAppBar, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(() => ({
  [`&.${AppBarClasses.appBar}`]: {
    paddingLeft: '1em',
  },

  [`& .${AppBarClasses.toolbar}`]: {
    paddingRight: 24,
  },

  [`& .${AppBarClasses.title}`]: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

export default memo(SimpleAppBar);
