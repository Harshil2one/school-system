import React from "react";
import apiService from "../../../../service/apiService";
import { toast } from "react-toastify";
import { StudentData } from "../Table/TableController";
import { StudentDetails } from "../../../student/Dashboard/DashboardController";
import { SubjectData } from "../../Subject/Table/TableController";

export interface StudentDialogProps {
  isOpen: boolean;
  mode: string;
  selectedStudent: StudentData;
  setIsOpen: (a: boolean) => void;
  studentList: StudentData[];
  setStudentList: (subjectList: StudentData[]) => void;
}

export interface StudentDialogState {
  filteredSubjects: SubjectData[];
  toBeAddedSubject: any;
}

class StudentController extends React.Component<
  StudentDialogProps,
  StudentDialogState
> {
  apiService = new apiService();
  generatedIDs = new Set();
  constructor(props: StudentDialogProps) {
    super(props);

    this.state = {
      filteredSubjects: [],
      toBeAddedSubject: {},
    };

    this.addStudentWiseSubject = this.addStudentWiseSubject.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
  }

  componentDidUpdate(
    prevProps: Readonly<StudentDialogProps>,
    prevState: Readonly<StudentDialogState>
  ): void {
    if (prevProps.selectedStudent !== this.props.selectedStudent) {
      this.setState({
        filteredSubjects: this.context.subjects?.filter((el: any) =>
          el.students.includes(this.props.selectedStudent.id)
        ),
      });
    }
  }

  generateId() {
    let id;
    do {
      id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    } while (this.generatedIDs.has(id));

    this.generatedIDs.add(id);
    return id;
  }

  async addUpdateStudent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selectedStudent = this.props.studentList.findIndex(
      (el: StudentData) => el.id === this.props.selectedStudent.id
    );
    const studentData = {
      id: this.props.selectedStudent.id || this.generateId(),
      name: data.get("name") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
      standard: data.get("standard") as string,
      division: data.get("division") as string,
    } as StudentData;

    const existingUserDetails = await this.apiService.fetchData(
      `users/${this.props.selectedStudent.id}`
    );

    try {
      if (this.props.selectedStudent.id) {
        await this.apiService.updateData(
          "students",
          this.props.selectedStudent.id,
          studentData
        );
        await this.apiService.updateData(
          "users",
          this.props.selectedStudent.id,
          {
            ...existingUserDetails,
            ...studentData,
            subjectReport: this.state.filteredSubjects.map((el) => {
              return {
                subject: el.name,
                mark: Math.floor(Math.random() * 100),
              };
            }),
          } as StudentDetails
        );
        const updatedStudentList = this.props.studentList;
        updatedStudentList[selectedStudent] = studentData;
        this.props.setStudentList(updatedStudentList);
        toast("Student details updated successfully.", { type: "success" });
      } else {
        await this.apiService.addData("students", studentData);
        await this.apiService.addData("users", {
          ...studentData,
          city: "",
          enroll_no: Math.floor(Math.random() * 100000000000).toString(),
          username: studentData.name,
          role: 2,
          mobile: "",
          class_strength: Math.floor(Math.random() * 250),
          mentor: this.context.user.name,
          address: "",
          state: "",
          country: "IND",
          zipCode: "",
          attendance: Math.floor(Math.random() * 10) + 15,
          leaves: Math.floor(Math.random() * 10),
          rank: Math.floor(Math.random() * 10) + 15,
          subjectReport: this.state.filteredSubjects.map((el) => {
            return {
              subject: el.name,
              mark: Math.floor(Math.random() * 100),
            };
          }),
        } as StudentDetails);
        const studentList = await this.apiService.fetchData("students");
        this.props.setStudentList(studentList);
        toast("New student added successfully.", { type: "success" });
      }

      this.props.setIsOpen(false);
    } catch (err) {
      console.error("Error: ", err);
      toast("Something wrong happened.", { type: "error" });
    }
  }

  handleSubjectChange(subjectName: string) {
    const toBeAddedSubject = this.context.subjects.find(
      (el: any) => el.name === subjectName
    ) as SubjectData;
    this.setState({ toBeAddedSubject });
  }

  async addStudentWiseSubject() {
    const isAlreadyAdded = this.state.filteredSubjects.findIndex(
      (el) => el.name === this.state.toBeAddedSubject.name
    );
    if (!this.state.toBeAddedSubject.name) {
      toast("Please select the subject first.", { type: "error" });
    } else if (isAlreadyAdded < 0) {
      this.setState({
        filteredSubjects: [
          ...this.state.filteredSubjects,
          this.state.toBeAddedSubject,
        ],
      });
      if (
        !this.state.toBeAddedSubject.students.length ||
        !this.props.selectedStudent.id
      ) {
        toast("Student details are not valid.", { type: "error" });
        return;
      }
      await this.apiService.updateData(
        "subjects",
        Number(this.state.toBeAddedSubject.id),
        {
          ...this.state.toBeAddedSubject,
          students:
            this.state.toBeAddedSubject.students &&
            Array.from(
              new Set([
                ...this.state.toBeAddedSubject.students,
                this.props.selectedStudent.id,
              ])
            ),
        }
      );
      toast("Subject is added for that student", { type: "success" });
    } else {
      toast("Subject is already available for that student.", {
        type: "error",
      });
    }
  }

  async handleRemoveSubjectFromStudent(id: number) {
    const selectedSubject: any = this.state.filteredSubjects.find(
      (el) => el.id === id
    );
    this.setState({
      filteredSubjects: this.state.filteredSubjects?.filter(
        (el: any) => el.id !== id
      ),
    });
    await this.apiService.updateData("subjects", id, {
      ...selectedSubject,
      students: selectedSubject?.students?.filter(
        (el: any) => el !== this.props.selectedStudent.id
      ),
    });
    toast("Subject is removed for that student", { type: "success" });
  }
}

export default StudentController;
