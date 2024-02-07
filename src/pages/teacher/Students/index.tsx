import React from "react";
import StudentTable from "./Table";
import { AuthContext } from "../../../routes/AppRouteController";

export default class StudentPage extends React.Component {
  render() {
    return <StudentTable />;
  }
}

StudentPage.contextType = AuthContext;
