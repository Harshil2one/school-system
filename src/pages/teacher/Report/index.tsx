import React from "react";
import ReportController from "./ReportController";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@material-ui/core";
import { AuthContext } from "../../../routes/AppRouteController";
import { StudentData } from "../Students/Table/TableController";
import { SubjectData } from "../../student/Subject/Table/TableController";

export default class ReportPage extends ReportController {
  render() {
    const { id, name, email, standard, division, reports } =
      this.state.selectedStudentData;
    return (
      <Box>
        <Typography variant="h5" style={{ padding: "20px 0 0 0" }}>
          Student Results
        </Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item md={3} sm={3} xs={6}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>Division</InputLabel>
              <Select
                label="Division"
                name="division"
                onChange={(e) => this.setState({ filter_1: e.target.value })}
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
          <Grid item md={3} sm={3} xs={6}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>Student</InputLabel>
              <Select
                label="Student"
                name="student"
                onChange={this.handleStudentData}
                disabled={this.state.filter_1 === ""}
              >
                {this.state.students
                  ?.filter(
                    (el: StudentData) =>
                      Number(el.standard) ===
                        Number(this.context.selectedClass) &&
                      el.division.toString() === this.state.filter_1.toString()
                  )
                  ?.map((menuItem: StudentData) => {
                    return (
                      <MenuItem value={menuItem.name} key={menuItem.id}>
                        {menuItem.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <br />
        {this.state.filter_2 !== "" ? (
          <Grid
            item
            xs={12}
            md={12}
            component="form"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              console.log(
                "sss",
                data.getAll("marks"),
                data.getAll("remarks"),
                data.get("examType")
              );
            }}
          >
            <Card>
              <CardContent style={{ padding: "16px 20px" }}>
                <Box>
                  <Typography variant="h5" style={styles.header}>
                    Student Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body1">
                        <b>Name :</b> {name}
                      </Typography>
                      <Typography variant="body1">
                        <b>Email :</b> {email}
                      </Typography>
                      <Typography variant="body1">
                        <b>Class :</b> {standard}
                      </Typography>
                      <Typography variant="body1">
                        <b>Division :</b> {division}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                  </Grid>
                </Box>
                <br />
                <Box>
                  <Typography variant="h5" style={styles.header}>
                    Results
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          value={this.state.examType}
                          onChange={(event) => this.handleExamTypeChange(event)}
                        >
                          <FormControlLabel
                            value="prelims"
                            control={<Radio />}
                            label="Prelims"
                          />
                          <FormControlLabel
                            value="intermediate"
                            control={<Radio />}
                            label="Intermediate"
                          />
                          <FormControlLabel
                            value="main"
                            control={<Radio />}
                            label="Main"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableCell>Subject</TableCell>
                            <TableCell align="center">Total Marks</TableCell>
                            <TableCell align="center">Min Marks</TableCell>
                            <TableCell>Obtained Marks</TableCell>
                            <TableCell>Remarks</TableCell>
                          </TableHead>
                          <TableBody>
                            {this.context.subjects
                              ?.filter((el: any) => el.students.includes(id))
                              .map((subject: SubjectData) => {
                                return (
                                  <TableRow>
                                    <TableCell>
                                      {subject.name} ({subject.code})
                                    </TableCell>
                                    <TableCell align="center">100</TableCell>
                                    <TableCell align="center">33</TableCell>
                                    <TableCell>
                                      <TextField
                                        margin="none"
                                        fullWidth
                                        name="marks"
                                        type="number"
                                        id="marks"
                                        variant="outlined"
                                        value={
                                          reports.find(
                                            (el: any) =>
                                              el.subjectId === subject.id
                                          )?.marks?.[this.state.examType]
                                        }
                                        size="small"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        margin="none"
                                        fullWidth
                                        name="remarks"
                                        type="text"
                                        id="mentor"
                                        variant="outlined"
                                        value={
                                          reports.find(
                                            (el: any) =>
                                              el.subjectId === subject.id
                                          )?.remarks?.[this.state.examType]
                                        }
                                        multiline
                                        minRows={1}
                                        maxRows={1}
                                        size="small"
                                      />
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <br />
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                      <Grid
                        container
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Grid item xs={6} md={3} style={styles.card}>
                          <Typography variant="body1" gutterBottom>
                            Total
                          </Typography>
                          <Typography variant="h3">
                            {reports.reduce((sum: number, b: any) => {
                              return (sum += b.marks?.[this.state.examType]);
                            }, 0)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} style={styles.card}>
                          <Typography variant="body1" gutterBottom>
                            Percentage
                          </Typography>
                          <Typography variant="h3">
                            {Number(
                              reports.reduce((sum: number, b: any) => {
                                return (sum += b.marks?.[this.state.examType]);
                              }, 0)
                            ) /
                              Number(
                                this.context.subjects?.filter((el: any) =>
                                  el.students.includes(id)
                                ).length
                              )}
                            %
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} style={styles.card}>
                          <Typography variant="body1" gutterBottom>
                            Grade
                          </Typography>
                          <Typography variant="h3">
                            {this.calculatePerformance(
                              Number(
                                reports.reduce((sum: number, b: any) => {
                                  return (sum +=
                                    b.marks?.[this.state.examType]);
                                }, 0)
                              ) /
                                Number(
                                  this.context.subjects?.filter((el: any) =>
                                    el.students.includes(id)
                                  ).length
                                )
                            )}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} style={styles.card}>
                          <Typography variant="body1" gutterBottom>
                            Remarks
                          </Typography>
                          <Typography
                            variant="h3"
                            style={{
                              color: `${
                                Number(
                                  reports.reduce((sum: number, b: any) => {
                                    return (sum +=
                                      b.marks?.[this.state.examType]);
                                  }, 0)
                                ) /
                                  Number(
                                    this.context.subjects?.filter((el: any) =>
                                      el.students.includes(id)
                                    ).length
                                  ) >
                                50
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          >
                            {Number(
                              reports.reduce((sum: number, b: any) => {
                                return (sum += b.marks?.[this.state.examType]);
                              }, 0)
                            ) /
                              Number(
                                this.context.subjects?.filter((el: any) =>
                                  el.students.includes(id)
                                ).length
                              ) >
                            50
                              ? "Pass"
                              : "Fail"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
            <Box sx={styles.buttonGrid}>
              <Button type="submit" variant="contained" style={styles.button}>
                Save
              </Button>
              <Button
                variant="contained"
                type="reset"
                color="primary"
                style={styles.button}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        ) : null}
      </Box>
    );
  }
}

const styles = {
  header: {
    borderBottom: "3px solid #f4f9fd",
    marginBottom: "10px",
  },
  card: {
    border: "3px solid #f4f9fd",
    padding: "15px 0 15px 0",
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  button: {
    marginTop: "20px",
    marginBottom: "10px",
    marginLeft: "20px",
  },
};

ReportPage.contextType = AuthContext;
