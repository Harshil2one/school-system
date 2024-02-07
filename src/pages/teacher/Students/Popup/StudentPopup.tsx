import React from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import StudentController from "./StudentController";
import { SubjectData } from "../../Subject/Table/TableController";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import { AuthContext } from "../../../../routes/AppRouteController";

export default class StudentDialog extends StudentController {
  render() {
    return (
      <Dialog open={this.props.isOpen} fullWidth maxWidth="lg">
        <Box
          component="form"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            this.addUpdateStudent(event);
          }}
        >
          <DialogTitle>
            <Typography variant="h5">Subject Info</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <TextField
                  margin="none"
                  fullWidth
                  id="name"
                  label="Student Name"
                  type="text"
                  name="name"
                  defaultValue={
                    this.props.mode === "edit"
                      ? this.props.selectedStudent?.name
                      : ""
                  }
                  multiline
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select
                    label="Class"
                    name="standard"
                    defaultValue={
                      this.props.mode === "edit"
                        ? this.props.selectedStudent.standard
                        : ""
                    }
                  >
                    {this.context.classes?.map(
                      (menuItem: { value: number; label: string }) => {
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
              <Grid item md={6} xs={12}>
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel>Division</InputLabel>
                  <Select
                    label="Division"
                    name="division"
                    defaultValue={
                      this.props.mode === "edit"
                        ? this.props.selectedStudent.division
                        : ""
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
              <Grid item md={12} xs={12}>
                <TextField
                  margin="none"
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  defaultValue={
                    this.props.mode === "edit"
                      ? this.props.selectedStudent?.email
                      : ""
                  }
                  multiline
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  margin="none"
                  fullWidth
                  id="password"
                  label="Temp Password"
                  type="text"
                  name="password"
                  defaultValue={
                    this.props.mode === "edit"
                      ? this.props.selectedStudent?.password
                      : ""
                  }
                  multiline
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
            {this.props.mode !== "add" ? (
              <>
                <br />
                <Divider />
                <br />
                <Typography variant="h5">Subjects</Typography>
                <br />
                <Grid container spacing={2}>
                  <Grid item md={3} xs={12}>
                    <TextField
                      margin="none"
                      fullWidth
                      id="code"
                      label="Subject Id"
                      type="text"
                      name="code"
                      value={this.state.toBeAddedSubject?.code || "SUBXX"}
                      variant="outlined"
                      size="small"
                      aria-readonly
                    />
                  </Grid>
                  <Grid item md={7} xs={12}>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <InputLabel>Subject Name</InputLabel>
                      <Select
                        label="Subject Name"
                        name="name"
                        defaultValue={this.state.toBeAddedSubject?.name}
                        onChange={(event: any) =>
                          this.handleSubjectChange(event.target.value)
                        }
                      >
                        {this.context.subjects?.map((menuItem: any) => {
                          return (
                            <MenuItem value={menuItem.name} key={menuItem.code}>
                              {menuItem.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={2} xs={6} style={styles.flexReverse}>
                    <Button
                      variant="contained"
                      onClick={this.addStudentWiseSubject}
                      style={styles.button}
                    >
                      <AddRoundedIcon /> Add Subject
                    </Button>
                  </Grid>
                </Grid>
                <br />
                <Box>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableCell align="center">No.</TableCell>
                        <TableCell align="center">Subject Id</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableHead>
                      <TableBody>
                        {this.state.filteredSubjects?.length > 0 &&
                        this.props.mode === "edit" ? (
                          this.state.filteredSubjects?.map(
                            (row: SubjectData, index: number) => (
                              <TableRow key={row.id}>
                                <TableCell align="center">
                                  {index + 1}
                                </TableCell>
                                <TableCell align="center">{row.code}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="center">
                                  <DeleteIcon
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={() =>
                                      this.handleRemoveSubjectFromStudent(
                                        Number(row.id)
                                      )
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            )
                          )
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              style={{ textAlign: "center" }}
                            >
                              No Data Available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.props.setIsOpen(false)}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {this.props.mode === "edit" ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  }
}

const styles = {
  flexReverse: { display: "flex", flexFlow: "row-reverse" },
  button: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    justifyContent: "flex-end",
  },
};

StudentDialog.contextType = AuthContext;
