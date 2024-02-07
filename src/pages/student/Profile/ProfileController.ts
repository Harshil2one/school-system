import { Component } from "react";
import apiService from "../../../service/apiService";
import { toast } from "react-toastify";
import { HISTORY, routeConstants } from "../../../utils/shared";
import * as Yup from "yup";

export type ProfileDetail = {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  profile_img: string;
  mobile: string;
  standard: number;
  division: string;
  mentor: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: number;
  subjectReport: { subject: string; mark: number }[];
};

export type PasswordChanges = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default class ProfileController extends Component {
  constructor(props: any) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
  }
  state = {
    classList: [],
    divisionList: [],
    stateList: [],
    countryList: [],
    passwordChanges: {} as PasswordChanges,
    isPasswordChange: false,
    errors: {} as any,
    image: "",
  };

  apiService = new apiService();
  fileInput: HTMLInputElement | null = null;

  profileValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email address is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    standard: Yup.string().required("Standard is required"),
    division: Yup.string().required("Division is required"),
    mentor: Yup.string().required("Mentor is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    zipCode: Yup.string()
      .matches(/^\d{6}$/, "Zip Code must be 6 digits")
      .required("Zip Code is required"),
  });

  passwordValidationSchema = Yup.object().shape({
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

  async componentDidMount() {
    try {
      const stateList = await this.apiService.fetchData("states");
      const countryList = await this.apiService.fetchData("country");
      this.setState({
        stateList,
        countryList,
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  }

  async handleSubmitData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.state.isPasswordChange) {
      this.updatePassword(event);
    } else {
      this.updateDetails(event);
    }
  }

  async updateDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updatedProfileDetails = {
      name: data.get("name"),
      email: data.get("email"),
      mobile: data.get("mobile"),
      standard: data.get("standard"),
      profile_img: this.state.image,
      division: data.get("division"),
      mentor: data.get("mentor"),
      address: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      country: "IND",
      zipCode: data.get("zipCode"),
    };
    const isValidate = await this.validateProfileDetails(
      updatedProfileDetails as any
    );
    if (isValidate) {
      try {
        await this.apiService.updateData("users", this.context.user.id, {
          ...this.context.user,
          ...updatedProfileDetails,
        });
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            ...this.context.user,
            ...updatedProfileDetails,
          })
        );
        toast("Profile details updated successfully.", { type: "success" });
      } catch (err) {
        console.error("Error: ", err);
        toast("Something wrong happened.", { type: "error" });
      }
    }
  }

  async updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updatePassword = {
      currentPassword: data.get("currentPassword"),
      newPassword: data.get("newPassword"),
      confirmPassword: data.get("confirmPassword"),
    };
    const isValidate = await this.validatePasswords(updatePassword as any);
    if (isValidate) {
      try {
        if (updatePassword.currentPassword !== this.context.user.password) {
          toast("Current password is not correct.", {
            type: "error",
          });
        } else if (
          updatePassword.currentPassword === updatePassword.newPassword
        ) {
          toast("Current and new password should be different.", {
            type: "error",
          });
        } else if (
          updatePassword.newPassword !== updatePassword.confirmPassword
        ) {
          toast("Password does not match.", { type: "error" });
        } else {
          await this.apiService.updateData("users", this.context.user.id, {
            ...this.context.user,
            password: updatePassword.confirmPassword,
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

  resetForm() {
    if (this.state.isPasswordChange) {
      this.setState({ passwordChanges: this.state.passwordChanges });
    }
  }

  async validateProfileDetails(details: ProfileDetail) {
    try {
      await this.profileValidationSchema.validate(details, {
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

  async validatePasswords(passwords: PasswordChanges) {
    try {
      await this.passwordValidationSchema.validate(passwords, {
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

  handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img),
      });
    }
  };

  handleAvatarClick = () => {
    if (this.fileInput) {
      this.fileInput.click();
    }
  };
}
