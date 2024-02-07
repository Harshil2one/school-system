import { Component } from "react";
import { HISTORY } from "../../../utils/shared";
import apiService from "../../../service/apiService";

export type StudentDetails = {
  id: number;
  enroll_no: string;
  username: string;
  name: string;
  email: string;
  password: string;
  role: number;
  mobile: string;
  standard: string;
  division: string;
  class_strength: number;
  mentor: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  attendance: number;
  leaves: number;
  rank: number;
  subjectReport: {
    subject: string;
    mark: number;
  }[];
};

export default class DashboardController extends Component {
  apiService = new apiService();

  state = {
    isStudentRedirect: false,
    dashboardData: JSON.parse(localStorage.getItem("userDetails") || "{}"),
  };

  async componentDidMount() {
    const id = HISTORY.location.search?.split?.("=")?.[1];
    if (id) {
      const users = await this.apiService.fetchData("users");
      const dashboardData = users.find(
        (el: any) => Number(el.id) === Number(id) && el.role === 2
      );
      this.setState({ dashboardData, isStudentRedirect: true });
    }
  }

  calculatePerformance(subjectReport: { subject: string; mark: number }[]) {
    const pct =
      subjectReport?.reduce(
        (partialSum: number, a: { subject: string; mark: number }) =>
          partialSum + a.mark,
        0
      ) / subjectReport?.length;

    if (pct !== undefined) {
      if (pct <= 30) {
        return "C";
      } else if (pct <= 50) {
        return "B";
      } else if (pct <= 70) {
        return "B+";
      } else if (pct <= 90) {
        return "A";
      } else {
        return "A+";
      }
    }

    return "N/A";
  }

  handleBack() {
    window.history.back();
  }
}
