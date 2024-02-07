import React from "react";
import { toast } from "react-toastify";
import apiService from "../../../../service/apiService";

export interface StudentData {
  id: number;
  name: string;
  standard: string;
  division: string;
  email: string;
  password: string;
}

class TableController extends React.Component {
  apiService = new apiService();
  state = {
    isOpen: false,
    mode: "add",
    selectedStudent: {} as StudentData,
    studentList: [],
    filteredStudents: [],
    filter_1: "",
  };

  async componentDidMount() {
    const studentList = await this.apiService.fetchData("students");
    this.setState({
      studentList,
      filteredStudents: studentList.filter(
        (el: any) => Number(el.standard) === Number(this.context.selectedClass)
      ),
    });
  }

  componentDidUpdate(prevProps: any, prevState: any): void {
    if (
      prevState.filter_1 !== this.state.filter_1 ||
      this.context.selectedClass !== prevState.selectedClass
    ) {
      const filterCondition = (el: any) =>
        Number(el.standard) === Number(this.context.selectedClass) &&
        (this.state.filter_1 ? el.division === this.state.filter_1 : true);

      const filteredStudents = this.state.studentList.filter(filterCondition);

      const hasFilteredStudentsChanged =
        JSON.stringify(filteredStudents) !==
        JSON.stringify(this.state.filteredStudents);

      if (hasFilteredStudentsChanged) {
        this.setState({ filteredStudents });
      }
    }
  }

  async handleEditStudent(row: StudentData) {
    this.setState({ isOpen: true, mode: "edit" });
    this.setState({ selectedStudent: row });
  }

  async handleDeleteStudent(id: number) {
    try {
      await this.apiService.deleteData("students", id);
      await this.apiService.deleteData("users", id);
      this.setState({
        filteredStudents: this.state.filteredStudents.filter(
          (el: StudentData) => el.id !== id
        ),
      });
      toast("Student is deleted.", { type: "success" });
    } catch (err) {
      console.error("Error: ", err);
      toast("Something wrong happened.", { type: "error" });
    }
  }
}

export default TableController;
