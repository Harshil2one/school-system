import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box } from "@material-ui/core";
import { SubjectData } from "./TableController";
import { AuthContext } from "../../../../routes/AppRouteController";

export default class SubjectTable extends React.Component {
  render() {
    return (
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell>No.</TableCell>
              <TableCell>Subject Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Expert</TableCell>
              <TableCell align="center">Priority</TableCell>
            </TableHead>
            <TableBody>
              {this.context.subjects?.filter((el: any) =>
                el.students.includes(this.context.user.id)
              )?.length ? (
                this.context.subjects
                  ?.filter((el: any) =>
                    el.students.includes(this.context.user.id)
                  )
                  ?.sort(
                    (a: SubjectData, b: SubjectData) =>
                      Number(b.priority) - Number(a.priority)
                  )
                  ?.map((row: SubjectData, index: number) => (
                    <TableRow key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.expert}</TableCell>
                      <TableCell align="center">{row.priority}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: "center" }}>
                    No Data Available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

SubjectTable.contextType = AuthContext;
