import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import LogIn from "../pages/LogIn";
import StudentDashboard from "../pages/student/Dashboard";
import TeacherDashboard from "../pages/teacher/Dashboard";
import StudentProfile from "../pages/student/Profile";
import TeacherProfile from "../pages/teacher/Profile";
import StudentReport from "../pages/student/Report";
import TeacherReports from "../pages/teacher/Report";
import StudentSubjectPage from "../pages/student/Subject";
import TeacherSubjectPage from "../pages/teacher/Subject";
import { HISTORY, routeConstants } from "../utils/shared";
import Header from "../component/Header";
import NotFound from "../pages/NotFound";
import ForgotPasswordPage from "../pages/LogIn/ForgotPassword";
import TeacherStudentData from "../pages/teacher/Students";
import { ThemeProvider } from "@material-ui/core";
import AppRouteController, { AuthContext } from "./AppRouteController";
import { ErrorBoundary } from "../component/ErrorBoundry";
import Footer from "../component/Footer";

class AppRoutes extends AppRouteController {
  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <AuthContext.Provider
          value={{
            user: this.state.user,
            subjects: this.state.subjects,
            teachers: this.state.teachers,
            classes: this.state.classes,
            divisions: this.state.divisions,
            selectedClass: this.state.selectedClass,
            updateSelectedClass: this.updateSelectedClass,
            updateSubjectList: this.updateSubjectList,
          }}
        >
          <Router history={HISTORY}>
            <Header
              theme={this.state.localTheme}
              setTheme={(localTheme: any) => this.setState({ localTheme })}
            >
              <ErrorBoundary>
                <Switch>
                  <Route
                    exact
                    path={routeConstants.LOGIN_PAGE}
                    component={LogIn}
                  />
                  <Route
                    exact
                    path={routeConstants.FORGOT_PASSWORD_PAGE}
                    component={ForgotPasswordPage}
                  />
                  <Route
                    path={routeConstants.STUDENT_DASHBOARD_PAGE}
                    component={StudentDashboard}
                  />
                  <Route
                    exact
                    path={routeConstants.STUDENT_SUBJECT_PAGE}
                    component={StudentSubjectPage}
                  />
                  <Route
                    exact
                    path={routeConstants.STUDENT_PROFILE_PAGE}
                    component={StudentProfile}
                  />
                  <Route
                    exact
                    path={routeConstants.STUDENT_REPORT_PAGE}
                    component={StudentReport}
                  />

                  <Route
                    exact
                    path={routeConstants.TEACHER_DASHBOARD_PAGE}
                    component={TeacherDashboard}
                  />
                  <Route
                    exact
                    path={routeConstants.TEACHER_PROFILE_PAGE}
                    component={TeacherProfile}
                  />
                  <Route
                    exact
                    path={routeConstants.TEACHER_SUBJECT_PAGE}
                    component={TeacherSubjectPage}
                  />
                  <Route
                    exact
                    path={routeConstants.TEACHER_STUDENT_DATA}
                    component={TeacherStudentData}
                  />
                  <Route
                    exact
                    path={routeConstants.TEACHER_REPORT_PAGE}
                    component={TeacherReports}
                  />

                  <Route component={NotFound} />
                </Switch>
              </ErrorBoundary>
              <Footer />
            </Header>
          </Router>
        </AuthContext.Provider>
      </ThemeProvider>
    );
  }
}

export default AppRoutes;
