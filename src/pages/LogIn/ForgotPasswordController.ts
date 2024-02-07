import React from "react";
import { toast } from "react-toastify";
import { HISTORY, routeConstants } from "../../utils/shared";
import { ProfileDetail } from "../student/Profile/ProfileController";
import * as Yup from "yup";
import apiService from "../../service/apiService";
import { AuthContext } from "../../routes/AppRouteController";

class ForgotPasswordController extends React.Component {
  constructor(props: any) {
    super(props);
    this.validateEmailPasswords = this.validateEmailPasswords.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  static contextType = AuthContext;
  apiService = new apiService();

  state = {
    errors: {} as any,
  };

  passwordValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter valid email address")
      .required("Email address is required"),
    currentPassword: Yup.string()
      .min(6, "Password must be at least 6 digits long")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one number, and one special character"
      )
      .required("Password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 digits long")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one number, and one special character"
      )
      .notOneOf(
        [Yup.ref("currentPassword")],
        "New password must be different from the current password"
      )
      .required("Password is required")
      .test("passwords-match", "Passwords must match", function (value) {
        return value === this.parent.confirmPassword;
      }),
    confirmPassword: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 digits long")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one number, and one special character"
      )
      .test("passwords-match", "Passwords must match", function (value) {
        return value === this.parent.newPassword;
      }),
  });

  async updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updatedPasswordDetails = {
      currentPassword: data.get("currentPassword"),
      newPassword: data.get("newPassword"),
      confirmPassword: data.get("confirmPassword"),
    };
    const isValidate = await this.validateEmailPasswords({
      ...updatedPasswordDetails,
      email: data.get("email"),
    });
    if (isValidate) {
      try {
        const res = await this.apiService.fetchData("users");
        const currentUser = res.find(
          (user: ProfileDetail) => user.email === data.get("email")
        );
        if (updatedPasswordDetails.currentPassword !== currentUser.password) {
          toast("Current password is not correct.", {
            type: "error",
          });
        } else if (
          updatedPasswordDetails.currentPassword ===
          updatedPasswordDetails.newPassword
        ) {
          toast("Current and new password should be different.", {
            type: "error",
          });
        } else if (
          updatedPasswordDetails.newPassword !==
          updatedPasswordDetails.confirmPassword
        ) {
          toast("Password does not match.", { type: "error" });
        } else {
          await this.apiService.updateData("users", currentUser.id, {
            ...this.context.user,
            password: updatedPasswordDetails.confirmPassword,
          });
          localStorage.removeItem("userDetails");
          HISTORY.push(routeConstants.LOGIN_PAGE);
          toast("Password updated successfully.", { type: "success" });
        }
      } catch (err) {
        console.error("Error: ", err);
        toast("Something wrong happened.", { type: "error" });
      }
    }
  }

  async validateEmailPasswords(details: any) {
    try {
      await this.passwordValidationSchema.validate(details, {
        abortEarly: false,
      });
      this.setState({ errors: {} });
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

export default ForgotPasswordController;
