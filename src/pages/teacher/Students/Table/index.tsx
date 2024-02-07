import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import StudentDialog from "../Popup/StudentPopup";
import TableController, { StudentData } from "./TableController";
import { Link } from "react-router-dom";
import { routeConstants } from "../../../../utils/shared";
import AddIcon from "@material-ui/icons/Add";
import { AuthContext } from "../../../../routes/AppRouteController";

export default class StudentTable extends TableController {
  render() {
    return (
      <>
        <StudentDialog
          isOpen={this.state.isOpen}
          setIsOpen={(isOpen: boolean) => this.setState({ isOpen })}
          selectedStudent={this.state.selectedStudent as StudentData}
          mode={this.state.mode}
          studentList={this.state.studentList}
          setStudentList={(studentList: StudentData[]) =>
            this.setState({ studentList })
          }
        />
        <Card>
          <CardContent>
            <Box style={styles.flexItems}>
              <Typography variant="h5" gutterBottom>
                Students
              </Typography>
              <Button
                variant="contained"
                onClick={() => this.setState({ isOpen: true, mode: "add" })}
              >
                <AddIcon /> Add
              </Button>
            </Box>
            <Grid container spacing={2} style={{ paddingBottom: "10px" }}>
              <Grid item md={3} sm={3} xs={6}>
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel>Division</InputLabel>
                  <Select
                    label="Division"
                    name="division"
                    onChange={(e) =>
                      this.setState({ filter_1: e.target.value })
                    }
                  >
                    {this.context.divisions?.map(
                      (menuItem: { value: string; label: string }) => {
                        return (
                          <MenuItem value={menuItem.value} key={menuItem.value}>
                            {menuItem.label}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableCell>No.</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Class</TableCell>
                  <TableCell align="center">Division</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableHead>
                <TableBody>
                  {this.state.filteredStudents?.length > 0 ? (
                    this.state.filteredStudents?.map(
                      (row: StudentData, index: number) => (
                        <TableRow key={row.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell align="left">
                            <Link
                              to={`${routeConstants.STUDENT_DASHBOARD_PAGE}?id=${row.id}`}
                              style={{ textDecoration: "none", color: "grey" }}
                            >
                              {row.name}
                            </Link>
                          </TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.standard}</TableCell>
                          <TableCell align="center">{row.division}</TableCell>
                          <TableCell
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <Typography
                              variant="body2"
                              style={{ cursor: "pointer", color: "green" }}
                              onClick={() => this.handleEditStudent(row)}
                            >
                              Edit
                            </Typography>
                            <Typography
                              variant="body2"
                              style={{ cursor: "pointer", color: "red" }}
                              onClick={() => this.handleDeleteStudent(row.id)}
                            >
                              Delete
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )
                    )
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
          </CardContent>
        </Card>
      </>
    );
  }
}

const styles = {
  flexItems: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px 10px 0px",
  },
};

StudentTable.contextType = AuthContext;
