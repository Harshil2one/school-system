import React from "react";
import { toast } from "react-toastify";
import { HISTORY, routeConstants } from "../../utils/shared";
import { ProfileDetail } from "../student/Profile/ProfileController";
import * as Yup from "yup";
import apiService from "../../service/apiService";

class LoginController extends React.Component {
  apiService = new apiService();
  state = {
    errors: {} as any,
  };

  handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const isValidate = await this.validateSignInCredentials(credentials);

    if (isValidate) {
      const res = await this.apiService.fetchData("users");
      const loginUser = res.find(
        (user: ProfileDetail) =>
          user.email === credentials.email &&
          user.password === credentials.password
      );

      if (loginUser) {
        toast("Login successfully.", { type: "success" });
        localStorage.setItem("userDetails", JSON.stringify(loginUser));
        if (loginUser.role === 1) {
          HISTORY.push(routeConstants.TEACHER_DASHBOARD_PAGE);
        } else {
          HISTORY.push(routeConstants.STUDENT_DASHBOARD_PAGE);
        }
      } else {
        toast("Invalid user credentials", { type: "error" });
      }
    }
  };

  async validateSignInCredentials(credentials: {
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
  }) {
    const { email, password } = credentials;
    try {
      await Yup.object({
        email: Yup.string()
          .email("Enter valid email address")
          .required("Email address is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 digits long")
          .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Password must contain at least one uppercase letter, one number, and one special character"
          )
          .required("Password is required"),
      }).validate({ email, password }, { abortEarly: false });
      this.setState({
        errors: {},
      });
    } catch (error: any) {
      const errors: any = {};
      if (error.inner) {
        error.inner.forEach((validationError: any) => {
          errors[validationError.path] = validationError.message;
        });
      }
      this.setState({ errors });
    }

    return Object.keys(this.state.errors)?.length === 0;
  }
}

export default LoginController;
