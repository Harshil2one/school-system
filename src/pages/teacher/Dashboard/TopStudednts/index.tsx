import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import { routeConstants } from "../../../../utils/shared";
import { StudentData } from "../../Students/Table/TableController";
import apiService from "../../../../service/apiService";
import { Avatar, Chip } from "@material-ui/core";

export default class TopStudents extends React.Component {
  apiService = new apiService();
  state = {
    studentList: [],
  };

  async componentDidMount() {
    const studentList = await this.apiService.fetchData("students");
    this.setState({
      studentList: studentList?.map((el: StudentData) => {
        return { ...el, grade: Math.floor((Math.random() + 0.2) * 80) };
      }),
    });
  }

  render() {
    return (
      <TableContainer style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableCell>Student</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="center">Class</TableCell>
            <TableCell align="center">Division</TableCell>
            <TableCell align="center">Grade</TableCell>
          </TableHead>
          <TableBody>
            {this.state.studentList?.length > 0 ? (
              this.state.studentList
                ?.sort((a: any, b: any) => {
                  return b.grade - a.grade;
                })
                ?.slice(0, 5)
                ?.map((row: any, index: number) => (
                  <TableRow key={row.id} hover>
                    <TableCell
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        padding: 5,
                      }}
                    >
                      <Avatar />
                      <Link
                        to={`${routeConstants.STUDENT_DASHBOARD_PAGE}?id=${row.id}`}
                        style={{ textDecoration: "none", color: "grey" }}
                      >
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell align="center">{row.standard}</TableCell>
                    <TableCell align="center">{row.division}</TableCell>
                    <TableCell align="center">
                      <Chip
                        size="small"
                        label={row.grade + "%"}
                        style={{
                          color: "#ffffff",
                          fontWeight: 600,
                          backgroundColor: `${
                            row.grade < 30
                              ? "#DC2265"
                              : row.grade < 50
                              ? "#FB8C00"
                              : "#4CA750"
                          }`,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center" }}>
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
