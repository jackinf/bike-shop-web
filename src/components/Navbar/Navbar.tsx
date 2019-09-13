import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton, makeStyles, Theme, useTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from '../Auth/AuthProvider';
import { GoogleLogout } from 'react-google-login';
import { config } from '../../index';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar/AppBar';
import React from 'react';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <AppBar position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Bike Shop
        </Typography>
        <AuthContext.Consumer>
          {({handleGoogleSignOut}) => (
            <GoogleLogout
              clientId={config.google.clientId || ''}
              onLogoutSuccess={handleGoogleSignOut}
              render={({onClick}) => (
                <Button color="inherit" onClick={onClick}>Log out</Button>
              )}
            />
          )}
        </AuthContext.Consumer>
      </Toolbar>
    </AppBar>
  )
}
