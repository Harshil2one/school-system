import React from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Menu,
  Avatar,
  MenuItem,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import HeaderController from "./HeaderController";
import { HISTORY, RoleUtils, routeConstants } from "../../utils/shared";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import AssessmentIcon from "@material-ui/icons/Assessment";

class Header extends HeaderController {
  render() {
    const isMobile = this.state.windowWidth < 580;

    return (
      <>
        <Dialog open={this.state.confirmPopup} maxWidth="lg">
          <DialogContent>
            <Typography variant="body1">
              Are You Sure, You Want to Logout?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleConfirmation}
              variant="contained"
              color="primary"
            >
              No
            </Button>
            <Button onClick={this.handleLogOut} variant="contained" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <div
          style={{
            ...styles.root,
            display:
              HISTORY.location.pathname === routeConstants.LOGIN_PAGE ||
              HISTORY.location.pathname === routeConstants.FORGOT_PASSWORD_PAGE
                ? "none"
                : "flex",
          }}
        >
          <CssBaseline />
          <AppBar position="fixed" style={styles.appBar}>
            <Toolbar
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexFlow: isMobile ? "wrap" : "",
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => this.setState({ isDrawerOpen: true })}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h3" noWrap style={styles.menuButton}>
                  Learning School
                </Typography>
                {JSON.parse(localStorage.getItem("userDetails") || "{}")
                  .role === RoleUtils.isTeacher ? (
                  <FormControl
                    variant="outlined"
                    size="small"
                    style={{
                      width: isMobile ? "-webkit-fill-available" : "150px",
                      display: `${isMobile ? "flex" : ""}`,
                      padding: isMobile ? "0 20px 10px 0" : 0,
                    }}
                  >
                    <InputLabel>Class</InputLabel>
                    <Select
                      label="Class"
                      name="standard"
                      onChange={(e) =>
                        this.context.updateSelectedClass(e.target.value)
                      }
                      value={this.context.selectedClass}
                    >
                      {this.context.classes?.map(
                        (menuItem: { value: string; label: string }) => {
                          return (
                            <MenuItem
                              value={menuItem.value}
                              key={menuItem.value}
                            >
                              {menuItem.label}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                  </FormControl>
                ) : null}
              </Box>
              <Box
                style={{
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <IconButton
                  style={{ marginLeft: 1 }}
                  size="small"
                  onClick={this.handleTheme}
                  color="inherit"
                >
                  {this.props.theme === "dark" ? (
                    <Brightness4Icon />
                  ) : (
                    <Brightness7Icon />
                  )}
                </IconButton>
                <IconButton aria-haspopup="false" onClick={this.handleMenu}>
                  <Badge
                    color="error"
                    badgeContent={
                      JSON.parse(localStorage.getItem("userDetails") || "{}")
                        .role === RoleUtils.isTeacher
                        ? "T"
                        : "S"
                    }
                    overlap="circular"
                  >
                    <Avatar />
                  </Badge>
                </IconButton>
                <Menu
                  className="profile-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                  MenuListProps={{
                    "aria-labelledby": "userMenu",
                  }}
                >
                  <MenuItem onClick={this.handleProfile}>My Profile</MenuItem>
                  <MenuItem onClick={this.handleConfirmation} title="Logout">
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <SwipeableDrawer
            onClose={() => this.setState({ isDrawerOpen: false })}
            onOpen={() => this.setState({ isDrawerOpen: true })}
            anchor="left"
            open={this.state.isDrawerOpen}
          >
            <div style={styles.drawerHeader}>
              <IconButton
                onClick={() =>
                  this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
                }
              >
                {this.state.isDrawerOpen ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {(JSON.parse(localStorage.getItem("userDetails") || "{}").role ===
              RoleUtils.isTeacher
                ? [
                    {
                      path: routeConstants.TEACHER_DASHBOARD_PAGE,
                      label: "Dashboard",
                    },
                    {
                      path: routeConstants.TEACHER_SUBJECT_PAGE,
                      label: "Subjects",
                    },
                    {
                      path: routeConstants.TEACHER_STUDENT_DATA,
                      label: "Students",
                    },
                    {
                      path: routeConstants.TEACHER_REPORT_PAGE,
                      label: "Reports",
                    },
                  ]
                : [
                    {
                      path: routeConstants.STUDENT_DASHBOARD_PAGE,
                      label: "Dashboard",
                    },
                    {
                      path: routeConstants.STUDENT_SUBJECT_PAGE,
                      label: "Subjects",
                    },
                    {
                      path: routeConstants.STUDENT_REPORT_PAGE,
                      label: "Report Card",
                    },
                  ]
              )?.map((item, index) => (
                <ListItem
                  button
                  key={item.path}
                  onClick={() => {
                    this.navigateToPage(item.path);
                    this.setState({
                      isDrawerOpen: false,
                    });
                  }}
                >
                  <ListItemIcon>
                    {index === 0 ? (
                      <HomeIcon />
                    ) : index === 1 ? (
                      <ImportContactsIcon />
                    ) : index === 2 ? (
                      <SupervisorAccountRoundedIcon />
                    ) : (
                      <AssessmentIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item.label} color="black" />
                </ListItem>
              ))}
            </List>
          </SwipeableDrawer>
        </div>
        <main
          style={{
            padding:
              window.location.pathname === routeConstants.LOGIN_PAGE ||
              window.location.pathname === routeConstants.FORGOT_PASSWORD_PAGE
                ? "0"
                : isMobile
                ? "9rem 1.5rem 10px"
                : "6rem 1.5rem 10px",
          }}
        >
          {this.props.children}
        </main>
      </>
    );
  }
}

export default Header;

const styles = {
  root: {
    display: "flex",
  },
  appBar: {
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    backdropFilter: "saturate(200%) blur(1.875rem)",
    display: "grid",
  },
  menuButton: {
    marginRight: "80px",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    minHeight: "64px",
    justifyContent: "flex-end",
    width: "240px",
  },
};
