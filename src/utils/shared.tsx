import { createBrowserHistory } from "history";

export const HISTORY = createBrowserHistory();

export const RoleUtils = {
  isTeacher: 1,
  isStudent: 2,
};

export const routeConstants = {
  LOGIN_PAGE: "/login",
  FORGOT_PASSWORD_PAGE: "/forgot-password",

  STUDENT_DASHBOARD_PAGE: "/student/dashboard",
  STUDENT_SUBJECT_PAGE: "/student/subject-summary",
  STUDENT_PROFILE_PAGE: "/student/profile",
  STUDENT_REPORT_PAGE: "/student/report-card",

  TEACHER_DASHBOARD_PAGE: "/teacher/dashboard",
  TEACHER_SUBJECT_PAGE: "/teacher/subject-summary",
  TEACHER_PROFILE_PAGE: "/teacher/profile",
  TEACHER_STUDENT_DATA: "/teacher/student-data",
  TEACHER_REPORT_PAGE: "/teacher/reports",

  NOTFOUND_PAGE: "/not-found",
};
