import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ChevronLeft, PowerSettingsNew } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { MainListItems } from "../component/ListItems";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignOut } from "../action/auth.action";
// components
import Dashboard from "./Dashboard";
import Booking from "./Booking";
import Parking from "./Parking";
import Owner from "./Owner";
import AddOwner from "../component/AddOwner";
import Customer from "./Customer";
import EditOwner from "../component/EditOwner";
import Session from "./Session";
import Region from "./Region";
import Employees from "./Employees";
import AddParking from "../component/AddParking";
import EditParking from "../component/EditParking";
import AddEmployees from "../component/AddEmployees";
import EditEmployee from "../component/EditEmployee";
import Admin from "./Admin";
import Receipt from "./Receipt";
import AddAdmin from "../component/AddAdmin";
import EditAdmin from "../component/EditAdmin";

// copyright section
function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ marginTop: "20px" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Quintessence
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// drawerwidth 
const drawerWidth = 240;
// style
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));
const Home = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoggedIn, level } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  //   role for divison
  const role = "admin";
  //   check auth
  if (!isLoggedIn) {
    props.history.push("/");
    return <p>Pleasae Login</p>;
  }
  // drawer open
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  // drawer close
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // sign out button click
  const handleSignOutClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // sign out button close
  const handleSignOutClose = () => {
    setAnchorEl(null);
  };
  // user sign out
  const handleSignOut = () => {
    setAnchorEl(null);
    dispatch(SignOut());
    props.history.push("/");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Quintessence
          </Typography>
          <IconButton onClick={handleSignOutClick} color="inherit">
            <PowerSettingsNew />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleSignOutClose}
          >
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <>
            <Route exact path="/home/" component={Dashboard} />
            <Route exact path="/home/booking" component={Booking} />
            <Route exact path="/home/parking" component={Parking} />
            <Route exact path="/home/parking/edit" component={EditParking} />
            <Route exact path="/home/customer" component={Customer} />
            <Route exact path="/home/employees" component={Employees} />
            <Route exact path="/home/employees/edit" component={EditEmployee} />
            <Route exact path="/home/owner" component={Owner} />
            <Route exact path="/home/owner/edit" component={EditOwner} />
            <Route exact path="/home/region" component={Region} />
            <Route exact path="/home/session" component={Session} />
            <Route exact path="/home/parking/add" component={AddParking} />
            <Route exact path="/home/owner/add" component={AddOwner} />
            <Route exact path="/home/receipt" component={Receipt} />
            {/* routing for only main admin */}
            {level === "edit" ? (
              <>
                <Route exact path="/home/admin" component={Admin} />
                <Route exact path="/home/admin/add" component={AddAdmin} />
                <Route exact path="/home/admin/edit" component={EditAdmin} />
                <Route
                  exact
                  path="/home/employees/add"
                  component={AddEmployees}
                />
              </>
            ) : null}
          </>
        </Switch>
        <Copyright />
      </main>
    </div>
  );
};

export default Home;
