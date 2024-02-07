import React from "react";
import apiService from "../../../../service/apiService";
import { toast } from "react-toastify";
import { SubjectData } from "../Table/TableController";

export interface SubjectDialogProps {
  isOpen: boolean;
  mode: string;
  selectedSubject: SubjectData;
  setIsOpen: (a: boolean) => void;
  setSubjects: (subjects: SubjectData[]) => void;
}

export interface SubjectDialogState {
  subjectList: SubjectData[];
}

class SubjectController extends React.Component<
  SubjectDialogProps,
  SubjectDialogState
> {
  apiService = new apiService();
  generatedIDs = new Set();

  async componentDidMount() {
    this.props.setIsOpen(this.props.isOpen);
  }

  generateId() {
    let id;
    do {
      id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    } while (this.generatedIDs.has(id));

    this.generatedIDs.add(id);
    return id;
  }

  async addUpdateSubject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subjectData = {
      id: this.props.selectedSubject.id || this.generateId(),
      name: data.get("name"),
      expert: data.get("expert"),
      code:
        this.props.selectedSubject.code ||
        "SUB" + Math.floor(Math.random() * 1000),
    } as SubjectData;

    try {
      if (this.props.selectedSubject.id) {
        await this.apiService.updateData(
          "subjects",
          this.props.selectedSubject.id,
          subjectData
        );
        const subjects = this.context.subjects?.map((subject: any) =>
          subject.code === subjectData.code
            ? {
                ...subject,
                name: subjectData.name,
                expert: subjectData.expert,
              }
            : subject
        );
        this.props.setSubjects(subjects);
        toast("Subject updated successfully.", { type: "success" });
      } else {
        await this.apiService.addData("subjects", subjectData);

        const subjectList = [...this.context.subjects, subjectData];

        this.props.setSubjects(subjectList);
        toast("New subject added successfully.", { type: "success" });
      }
      this.props.setIsOpen(false);
    } catch (err) {
      console.error("Error: ", err);
      toast("Something wrong happened.", { type: "error" });
    }
  }
}

export default SubjectController;
