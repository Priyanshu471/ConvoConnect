import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { Grid } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import Rooms from "./Rooms";
import { GoSignOut } from "react-icons/go";
import { FaUserEdit } from "react-icons/fa";
import { auth, db } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import logo from "../Assets/cc.png";
import { AiOutlineHome } from "react-icons/ai";

const drawerWidth = 240;

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  avatarGrid: {
    paddingTop: "20px",
    paddingLeft: "5px",
    paddingBottom: "20px",
    color: "#dcddde",
  },
  avatarIcon: {
    display: "flex",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  avatarName: {
    fontSize: "1em",
    paddingLeft: "12px",
    paddingTop: "8px",
  },
  avatarDisplayName: {
    alignSelf: "center",
    paddingLeft: "10px",
    fontWeight: "600",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: "#3f51b5",
  },
  user: {
    width: "30px",
    height: "30px",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#171c2e",
    color: "#dcddde",
    boxShadow:
      "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#171c2e",
    color: "white",
  },
  sideToolBar: {
    backgroundColor: "#171c2e",
    color: "#fff",
    lineHeight: 1.6,
    boxShadow:
      "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);",
    minHeight: "54px",
  },
  sideToolBarText: {
    letterSpacing: "0.1em",
    fontWeight: "700",
    fontSize: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    marginLeft: "0px",
  },
  title: {
    flexGrow: 1,
  },
}));
function Application(props) {
  const { window, uid } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const open = Boolean(anchorEl);
  // console.log(userDetails.photoURL);
  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .onSnapshot((doc) => {
        setUserDetails(doc.data());
        localStorage.setItem("userDetails", JSON.stringify(doc.data()));
      });
  }, [uid]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleEditProfile = () => {
    setEditProfileModal(!editProfileModal);
  };

  const handleAlert = () => {
    setAlert(!alert);
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("signed out");
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const drawer = userDetails && (
    <div>
      <Toolbar className={classes.sideToolBar}>
        <div className={classes.sideToolBarText}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
          <h6 style={{ fontSize: "20px", margin: "0" }}>ConvoConnect</h6>
        </div>
      </Toolbar>
      <Divider />
      <Grid className={classes.avatarGrid}>
        <div className={classes.avatarIcon}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              alt={userDetails.name}
              src={userDetails.photoURL}
              className={classes.purple}
            />
          </StyledBadge>
          <Typography variant="h6" className={classes.avatarDisplayName}>
            {userDetails.displayName}
          </Typography>
        </div>
      </Grid>
      <Divider />
      <Rooms />
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        onClose={handleAlert}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        message="Name Updated"
        key={Slide}
      />

      {editProfileModal ? (
        <EditProfile toggler={toggleEditProfile} alert={handleAlert} />
      ) : null}

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ minHeight: "50px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <AiOutlineHome style={{ margin: "0px 5px -2px 15px" }} />
              Home
            </Link>
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt={userDetails.name}
                src={userDetails.photoURL}
                className={classes.user}
              />
            </IconButton>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              keepMounted
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={toggleEditProfile}>
                <FaUserEdit /> &nbsp; Edit Name
              </MenuItem>

              <MenuItem onClick={signOut}>
                <GoSignOut /> &nbsp; Sign Out
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="chat rooms">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default Application;
