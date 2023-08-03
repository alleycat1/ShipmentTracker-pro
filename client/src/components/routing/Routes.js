import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import { Link } from 'react-router-dom';
import Login from '../auth/Login';
import dashboard from '../dashboard/Dashboard';
import createShip from '../dashboard/createShip';
import PrivateRoute from './PrivateRoute';
import Tracker from '../shipmentTrack/Tracker';
import Profile from '../profile/Profile';
import Handover from '../handover/Handover';
import classNames from 'classnames';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Alert from '../layout/Alert';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Landing from '../layout/Landing';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
    alignContent: 'flex-end',
    alignItems: 'flex-end'
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  rootnotify: {
    // display: "flex",
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const Routes = (
  { auth: { user, isAuthenticated, loading }, logout },
  props
) => {
  const classes = useStyles();

  const [openNotify, setOpenNotify] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenNotify((prevOpenNotify) => !prevOpenNotify);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenNotify(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenNotify(false);
    }
  }

  // return focus to the button when we transitioned from !openNotify -> openNotify
  const prevOpenNotify = React.useRef(openNotify);
  React.useEffect(() => {
    if (prevOpenNotify.current === true && openNotify === false) {
      anchorRef.current.focus();
    }

    prevOpenNotify.current = openNotify;
  }, [openNotify]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const authLinks = (
    <div>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/createShip">
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Create Shipment" />
        </ListItem>
        <ListItem button component={Link} to="/handover">
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Handover Shipment" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/profile">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
  const guestLinks = (
    <List>
      <ListItem button component={Link} to="/login">
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
      <ListItem button component={Link} to="/register">
        <ListItemIcon>
          <LockOpenIcon />
        </ListItemIcon>
        <ListItemText primary="Sign up" />
      </ListItem>
    </List>
  );
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            //edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="https://www.happiestminds.com/wp-content/themes/hmtheme/images/happiest_mind_logo.png"
            alt="Happiest Minds"
          />
          {!loading && isAuthenticated && (
            <Fragment>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <div>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                    ref={anchorRef}
                    aria-controls={openNotify ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <Badge badgeContent={3} color="secondary">
                      <NotificationsIcon />{' '}
                    </Badge>
                  </IconButton>
                  <Popper
                    open={openNotify}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom'
                              ? 'center top'
                              : 'center bottom'
                        }}
                      >
                        <ClickAwayListener onClickAway={handleClose}>
                          <List
                            className={classes.rootnotify}
                            autoFocusItem={openNotify}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <ListItem
                              alignItems="flex-start"
                              onClick={handleClose}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  alt="Remy Sharp"
                                  src="/static/images/avatar/1.jpg"
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary="Receive Consignment"
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      className={classes.inline}
                                      color="textPrimary"
                                    >
                                      Shipper A-
                                    </Typography>
                                    {
                                      'You have received a request to receive Consignment'
                                    }
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem
                              alignItems="flex-start"
                              onClick={handleClose}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  alt="Travis Howard"
                                  src="/static/images/avatar/2.jpg"
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary="Handover Request"
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      className={classes.inline}
                                      color="textPrimary"
                                    >
                                      Vehicle Operator C-
                                    </Typography>
                                    {
                                      'You have received a request to receive Consignment'
                                    }
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem
                              alignItems="flex-start"
                              onClick={handleClose}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  alt="Cindy Baker"
                                  src="/static/images/avatar/3.jpg"
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary="Handover Request"
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      className={classes.inline}
                                      color="textPrimary"
                                    >
                                      Logistic Provider B-
                                    </Typography>
                                    {
                                      'You have received a request to receive Consignment'
                                    }
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                          </List>
                        </ClickAwayListener>
                      </Grow>
                    )}
                  </Popper>
                </div>
                {/* </div> */}
                <IconButton
                  aria-label="account of current user"
                  color="inherit"
                  component={Link}
                  to="/profile"
                >
                  <AccountCircle />
                  {user && user.firstName}
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="logout"
                  color="inherit"
                  onClick={logout}
                >
                  {' '}
                  <ExitToAppIcon />
                </IconButton>
              </div>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          {!loading && isAuthenticated ? (
            <Typography
              gutterBottom="true"
              align="center"
              variant="h6"
              color="primary"
            >
              {'Welcome' + '  ' + (user && user.username) + ' ! '}
            </Typography>
          ) : null}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <Divider />
        {!loading && isAuthenticated ? authLinks : guestLinks}
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={dashboard} />
            <PrivateRoute exact path="/createShip" component={createShip} />
            <PrivateRoute exact path="/track/:id" component={Tracker} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/handover" component={Handover} />
          </Switch>
        </section>
      </main>
    </div>
  );
};

Routes.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  window: PropTypes.func
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Routes);
