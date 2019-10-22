import React from 'react';
import clsx from 'clsx';
import { withRouter } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton, useTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SettingsIcon from '@material-ui/icons/Settings';

import { AuthContext } from '../Auth/AuthProvider';
import useStyles from './useStyles';

function Navbar({history}: any) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(localStorage.getItem('navbarOpen') === 'true');

  function handleDrawerOpen() {
    setOpen(true);
    localStorage.setItem('navbarOpen', 'true');
  }

  function handleDrawerClose() {
    setOpen(false);
    localStorage.setItem('navbarOpen', 'false');
  }

  return (
    <>
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
            {({handleLogout}) => <Button color="inherit" onClick={handleLogout}>Log out</Button>}
          </AuthContext.Consumer>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="Home" onClick={() => history.push('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key="BikeTypes" onClick={() => history.push('/bike-types')}>
            <ListItemIcon>
              <DirectionsBikeIcon />
            </ListItemIcon>
            <ListItemText primary="Bikes" />
          </ListItem>
          <ListItem button key="Cart" onClick={() => history.push('/cart')}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="In Cart" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Account" onClick={() => history.push('/account')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default withRouter(Navbar);
