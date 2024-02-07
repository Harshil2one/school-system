import { Component, createContext } from "react";
import { HISTORY, routeConstants } from "../utils/shared";
import { createTheme } from "@material-ui/core";
import apiService from "../service/apiService";

export const AuthContext = createContext<any>({
  user: null,
  subjects: [],
  teachers: [],
  classes: [],
  divisions: [],
  selectedClass: 0,
  updateSelectedClass: null,
});

export default class AppRouteController extends Component {
  apiService = new apiService();

  constructor(props: any) {
    super(props);
    this.updateSelectedClass = this.updateSelectedClass.bind(this);
    this.updateSubjectList = this.updateSubjectList.bind(this);
  }

  state: {
    user: any;
    localTheme: string;
    theme: any;
    subjects: any[];
    teachers: any[];
    classes: any[];
    divisions: any[];
    selectedClass: number;
  } = {
    user: JSON.parse(localStorage.getItem("userDetails") || "{}"),
    localTheme: JSON.parse(localStorage.getItem("theme") || "{}") as string,
    theme: this.createThemeFromLocalTheme(
      JSON.parse(localStorage.getItem("theme") || "{}") as string
    ),
    subjects: [],
    teachers: [],
    classes: [],
    divisions: [],
    selectedClass: 1,
  };

  async componentDidMount() {
    const storedUser = JSON.parse(localStorage.getItem("userDetails") || "{}");
    const storedTheme = JSON.parse(localStorage.getItem("theme") || "{}");
    const subjects = await this.apiService.fetchData("subjects");
    const teachers = await this.apiService.fetchData("teachers");
    const classes = await this.apiService.fetchData("classes");
    const divisions = await this.apiService.fetchData("divisions");

    this.setState({
      user: storedUser,
      localTheme: storedTheme,
      subjects,
      teachers,
      classes,
      divisions,
    });
    if (!this.state.user.id || HISTORY.location.pathname === "/") {
      HISTORY.push(routeConstants.LOGIN_PAGE);
    }
  }

  createThemeFromLocalTheme(localTheme: string) {
    return createTheme({
      palette: {
        primary: {
          main:
            localTheme !== "dark"
              ? "rgb(242 242 242 / 80%)"
              : "rgba(26, 32, 53, 0.8)",
        },
        secondary: {
          main: localTheme !== "dark" ? "#1A2035" : "#d3e9ff96",
        },
        background: {
          default: localTheme === "dark" ? "#1A2035" : "#d3e9ff96",
          paper: localTheme === "dark" ? "#1A2035" : "#d3e9ff96",
        },
        text: {
          primary: localTheme === "dark" ? "#ffffff" : "#000000",
          secondary: localTheme !== "dark" ? "#ffffff" : "#000000",
        },
      },
      typography: {
        fontFamily: "Roboto, sans-serif",
        h1: {
          fontSize: "2rem",
          fontWeight: 600,
          color: localTheme === "dark" ? "#f2f2f2" : "#020202",
        },
        h2: {
          fontSize: "1.7rem",
          fontWeight: 600,
          color: localTheme === "dark" ? "#f2f2f2" : "#020202",
        },
        h3: {
          fontSize: "22px",
          fontWeight: 600,
          color: localTheme === "dark" ? "#ffffff" : "#000000",
          marginBottom: "0",
        },
        h5: {
          fontSize: "1.4rem",
          fontWeight: 600,
          color: localTheme === "dark" ? "#f2f2f2" : "#2d56a6",
        },
        h6: {
          fontSize: "1.4rem",
          fontWeight: 600,
        },
        body1: {
          fontSize: "1rem",
          fontWeight: 400,
          color: "grey",
        },
        body2: {
          margin: "0px",
          fontWeight: 400,
          fontSize: "14px",
          color: "orange",
        },
        subtitle1: {
          fontSize: "1rem",
          fontWeight: 400,
          color: `${localTheme !== "dark" ? "#1A2035" : "#d3e9ff96"}`,
        },
        subtitle2: {
          fontSize: "0.75rem",
          fontWeight: 400,
          color: "grey",
        },
      },
      overrides: {
        MuiButton: {
          text: {
            color: `${localTheme !== "dark" ? "#1A2035" : "#d3e9ff96"}`,
          },
          root: {
            borderRadius: 10,
            "&:hover": {
              fontWeight: "600 !important",
            },
          },
          contained: {
            backgroundColor: `${localTheme !== "dark" ? "#2d56a6" : "#F0F2F5"}`,
            color: `${localTheme === "dark" ? "#1A2035" : "#F0F2F5"}`,
            "&:hover": {
              backgroundColor: `${
                localTheme !== "dark" ? "#2d56a6" : "#F0F2F5"
              }`,
            },
          },
          containedPrimary: {
            backgroundColor: `${localTheme === "dark" ? "#202940" : "#F0F2F5"}`,
            color: `${localTheme !== "dark" ? "#1A2035" : "#F0F2F5"}`,
            "&:hover": {
              backgroundColor: `${
                localTheme === "dark" ? "#202940" : "#F0F2F5"
              }`,
            },
          },
        },
        MuiTextField: {
          root: {
            color: "#000000 !important",
            backgroundColor: `${
              localTheme === "dark" ? "#1A2035" : "#ffffff"
            } !important`,
          },
        },
        MuiFilledInput: {
          root: {
            backgroundColor: `${
              localTheme === "dark" ? "#1A2035" : "#ffffff"
            } !important`,
            border: `1px solid ${
              localTheme !== "dark" ? "#000000" : "#ffffff"
            } !important`,
          },
        },
        MuiInputLabel: {
          outlined: {
            color: `${
              localTheme !== "dark" ? "#1A2035" : "#d3e9ff96"
            } !important`,
          },
          filled: {
            color: `${
              localTheme !== "dark" ? "#1A2035" : "#d3e9ff96"
            } !important`,
          },
        },
        MuiAvatar: {
          circular: {
            backgroundColor:
              localTheme === "dark"
                ? "#ffffff !important"
                : "#020202 !important",
            color: localTheme === "dark" ? "#1A2035" : "#F0F2F5",
          },
        },
        MuiTableContainer: {
          root: {
            borderRadius: "10px",
          },
        },
        MuiTableHead: {
          root: {
            backgroundColor: localTheme === "dark" ? "#202940" : "#C3DFFF",
            fontWeight: 600,
            padding: "100px",
            borderBottom: `1px solid ${
              localTheme !== "dark" ? "#202940" : "#FFFFFF"
            } !important`,
          },
        },
        MuiTableRow: {
          root: {
            borderBottom: `1px solid ${
              localTheme !== "dark" ? "#202940" : "#FFFFFF"
            } !important`,
            fontSize: "0.9rem",
            fontWeight: 600,
            backgroundColor: `${localTheme === "dark" ? "#202940" : "#C3DFFF"}`,
          },
        },
        MuiTableCell: {
          head: {
            fontWeight: 600,
            color: localTheme !== "dark" ? "#202940" : "#FFFFFF",
          },
          root: {
            borderBottom: 0,
            margin: "4px 0",
          },
        },
        MuiSelect: {
          root: {
            backgroundColor: "#000000",
          },
          selectMenu: {
            backgroundColor: `${
              localTheme === "dark" ? "#1A2035" : "#ffffff"
            } !important`,
          },
          icon: {
            color: `${localTheme !== "dark" ? "#1A2035" : "#d3e9ff96"}`,
          },
          outlined: {
            color: `${localTheme !== "dark" ? "#1A2035" : "#F0F2F5"}`,
          },
        },
        MuiDrawer: {
          paper: {
            backgroundColor: `${
              localTheme === "dark" ? "#1A2035" : "#F0F2F5"
            } !important`,
          },
        },
        MuiDialog: {
          paper: {
            padding: "10px 20px",
            borderRadius: "20px",
            backgroundColor: localTheme === "dark" ? "#1A2035" : "#E5F2FF",
          },
        },
        MuiListItemIcon: {
          root: {
            color: `${localTheme !== "dark" ? "#1A2035" : "#F0F2F5"}`,
          },
        },
        MuiListItemText: {
          primary: {
            color: `${localTheme !== "dark" ? "#1A2035" : "#F0F2F5"}`,
          },
        },
        MuiIconButton: {
          root: {
            color: `${
              localTheme !== "dark"
                ? "#1A2035 !important"
                : "#F0F2F5 !important"
            }`,
          },
        },
        MuiPopover: {
          paper: {
            backgroundColor: "#ffffff",
          },
        },
        MuiOutlinedInput: {
          notchedOutline: {
            border: `1px solid ${
              localTheme !== "dark" ? "#000000" : "#ffffff"
            } !important`,
          },
          root: {
            "&.Mui-error": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "red !important",
              },
            },
          },
        },
        MuiFormHelperText: {
          root: {
            color: "red",
            fontSize: "0.8rem",
            margin: "0 !important",
            "&.Mui-error": {
              color: "red",
              fontSize: "0.8rem",
              margin: "0 !important",
              backgroundColor: `${
                localTheme === "dark" ? "#202940" : "#C3DFFF"
              }`,
            },
          },
        },
        MuiCard: {
          root: {
            backgroundColor: localTheme === "dark" ? "#202940" : "#c3dfff",
          },
        },
        MuiDivider: {
          root: {
            backgroundColor: `${
              localTheme !== "dark" ? "#000000" : "#ffffff"
            } !important`,
          },
        },
      },
    });
  }

  updateSelectedClass(selectedClass: string) {
    this.setState({ selectedClass });
  }

  updateSubjectList(subjects: any[]) {
    this.setState({ subjects });
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const storedUser = JSON.parse(localStorage.getItem("userDetails") || "{}");
    if (this.state.user.enroll_no !== storedUser.enroll_no) {
      this.setState({
        user: storedUser,
      });
    } else if (this.state.localTheme !== prevState.localTheme) {
      const newTheme = this.createThemeFromLocalTheme(this.state.localTheme);
      this.setState({ theme: newTheme });
    }
  }
}
