import { Component } from "react";
import { StudentData } from "../Students/Table/TableController";
import apiService from "../../../service/apiService";

export default class ReportController extends Component {
  apiService = new apiService();
  constructor(props: any) {
    super(props);
    this.handleStudentData = this.handleStudentData.bind(this);
    this.calculatePerformance = this.calculatePerformance.bind(this);
  }

  state = {
    students: [] as StudentData[],
    filter_1: "",
    filter_2: "",
    examType: "prelims",
    selectedStudentData: {} as any,
  };

  async componentDidMount() {
    const students = await this.apiService.fetchData("students");
    this.setState({ students });
  }

  handleStudentData(e: any) {
    this.setState({ filter_2: e.target.value });
    if (e.target.value) {
      this.setState({
        selectedStudentData: {
          ...this.state.students.find((ele) => ele.name === e.target.value),
          reports: this.context.subjects
            .map((ele: any) =>
              ele.reports.filter(
                (item: any) =>
                  item.studentId ===
                  this.state.students.find((ele) => ele.name === e.target.value)
                    ?.id
              )
            )
            .flat(),
        },
      });
    }
  }

  handleExamTypeChange(event: any) {
    this.setState({
      examType: event.target.value,
      selectedStudentData: {
        ...this.state.students.find((ele) => ele.name === this.state.filter_2),
        reports: this.context.subjects
          .map((ele: any) =>
            ele.reports.filter(
              (item: any) =>
                item.studentId ===
                this.state.students.find(
                  (ele) => ele.name === this.state.filter_2
                )?.id
            )
          )
          .flat(),
      },
    });
  }

  calculatePerformance(pct: number) {
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
}
