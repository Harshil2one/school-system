import React from "react";
import { HISTORY, RoleUtils, routeConstants } from "../../utils/shared";
import { AuthContext } from "../../routes/AppRouteController";

interface State {
  isDrawerOpen: boolean;
  anchorEl: any;
  confirmPopup: boolean;
  windowWidth: number;
}
class HeaderController extends React.Component<{
  theme: any;
  setTheme: (a: any) => void;
}> {
  constructor(props: any) {
    super(props);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
  }
  static contextType = AuthContext;

  state: State = {
    isDrawerOpen: false,
    anchorEl: null,
    confirmPopup: false,
    windowWidth: window.innerWidth,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  navigateToPage(path: string) {
    HISTORY.push(path);
  }

  handleMenu(event: React.MouseEvent<HTMLElement>) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };

  handleProfile() {
    this.navigateToPage(
      JSON.parse(localStorage.getItem("userDetails") || "{}").role ===
        RoleUtils.isTeacher
        ? routeConstants.TEACHER_PROFILE_PAGE
        : routeConstants.STUDENT_PROFILE_PAGE
    );
    this.handleClose();
  }

  handleConfirmation() {
    this.setState({ confirmPopup: !this.state.confirmPopup });
  }

  handleLogOut() {
    localStorage.removeItem("userDetails");
    this.navigateToPage(routeConstants.LOGIN_PAGE);
    this.handleClose();
    this.setState({ confirmPopup: false });
  }

  handleTheme() {
    const newTheme = this.props.theme === "dark" ? "light" : "dark";
    this.props.setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  }
}

export default HeaderController;
