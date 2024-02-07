import React from "react";
import { toast } from "react-toastify";
import apiService from "../../../../service/apiService";

export interface SubjectData {
  id?: number;
  name: string;
  code: string;
  expert?: string;
}

class TableController extends React.Component {
  apiService = new apiService();
  state = {
    isOpen: false,
    mode: "add",
    subjects: [] as SubjectData[],
    selectedSubject: {} as SubjectData,
  };

  componentDidUpdate(
    prevProps: Readonly<{
      isOpen: boolean;
      mode: string;
      setIsOpen: (a: boolean) => void;
    }>,
    prevState: any
  ): void {
    if (
      JSON.stringify(this.context.subjects) !==
      JSON.stringify(this.state.subjects)
    ) {
      if (this.state.subjects.length === 0) {
        this.setState({ subjects: this.context.subjects });
        return;
      }
      this.setState({ subjects: this.state.subjects });
      this.context.updateSubjectList(this.state.subjects);
    }
  }

  async handleEditSubject(row: SubjectData) {
    this.setState({ isOpen: true, mode: "edit" });
    this.setState({ selectedSubject: row });
  }

  async handleDeleteSubject(id: number) {
    try {
      await this.apiService.deleteData("subjects", id);
      this.setState({
        subjects: this.context.subjects.filter((el: any) => el.id !== id),
      });
      this.context.updateSubjectList(this.state.subjects);
      toast("Subject is deleted.", { type: "success" });
    } catch (err) {
      console.error("Error: ", err);
      toast("Something wrong happened.", { type: "error" });
    }
  }
}

export default TableController;
