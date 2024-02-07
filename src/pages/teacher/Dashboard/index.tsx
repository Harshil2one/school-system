import React from "react";
import BarChart from "../../../component/Charts/BarChart";
import { Card, Grid, Box, CardContent, Typography } from "@material-ui/core";
import PieChart from "../../../component/Charts/PieChart";
import DashboardController from "./DashboardController";
import { AuthContext } from "../../../routes/AppRouteController";
import Calender from "../../../component/Calender";
import { EventDummy } from "../../../component/EventDummy";
import TopStudents from "./TopStudednts";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import {
  AchievementIcon,
  ClassIcon,
  StudentsIcon,
  TeacherIcon,
} from "../../../assets/assets";

export default class DashBoard extends DashboardController {
  render() {
    const { username, departments, awards, classData } = this.userDetails;

    return (
      <Box>
        <Typography variant="h5" style={{ padding: "20px 0 0 0" }}>
          Welcome, {username}!
        </Typography>
        <Grid container spacing={3} style={styles.cardWrapper}>
          <Grid item xs={12} md={3} style={styles.card}>
            <Card style={styles.cardBody}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Departments
                </Typography>
                <Typography variant="h3">{departments}+</Typography>
              </CardContent>
              <img
                src={TeacherIcon}
                alt="Profile"
                style={{
                  paddingRight: "20px",
                }}
                height={80}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={3} style={styles.card}>
            <Card style={styles.cardBody}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Revenue (Monthly)
                </Typography>
                <Typography variant="h3">
                  ₹
                  {this.shortenNumber(this.calculateStudents(classData) * 1365)}
                </Typography>
              </CardContent>
              <img
                src={ClassIcon}
                alt="Rank"
                style={{ paddingRight: "20px" }}
                height={80}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={3} style={styles.card}>
            <Card style={styles.cardBody}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Awards
                </Typography>
                <Typography variant="h3">{awards}+</Typography>
              </CardContent>
              <img
                src={AchievementIcon}
                alt="Attendance"
                style={{ paddingRight: "20px" }}
                height={80}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={3} style={styles.card}>
            <Card style={styles.cardBody}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Students
                </Typography>
                <Typography variant="h3">
                  {this.calculateStudents(classData)}
                </Typography>
              </CardContent>
              <img
                src={StudentsIcon}
                alt="Performance"
                style={{ paddingRight: "20px" }}
                height={80}
              />
            </Card>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card style={styles.graphCard1}>
                  {this.getClassData(this.context.selectedClass)?.length > 0 ? (
                    <BarChart
                      graphData={this.getClassData(
                        this.context.selectedClass
                      )?.map((el: any) => el.student)}
                      key="students"
                      title="Students Info"
                      tooltip="Students per class"
                      labels={this.getClassData(
                        this.context.selectedClass
                      )?.map((el: any) => el.division)}
                    />
                  ) : (
                    <Box
                      style={{
                        display: "flex",
                        flexFlow: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "300px" }} />
                      <Typography variant="h3">No Data Found.</Typography>
                    </Box>
                  )}
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card style={styles.graphCard2}>
                  {this.getTakenClasses(this.context.selectedClass) ||
                  this.getMissedClasses(this.context.selectedClass) ? (
                    <PieChart
                      data={[
                        this.getTakenClasses(this.context.selectedClass) -
                          this.getMissedClasses(this.context.selectedClass),
                        this.getMissedClasses(this.context.selectedClass),
                      ]}
                      key="classes"
                      title="Classes Summary"
                      tooltip={["Attempted classes", "Missed classes"]}
                    />
                  ) : (
                    <Box
                      style={{
                        display: "flex",
                        flexFlow: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "300px" }} />
                      <Typography variant="h3">No Data Found.</Typography>
                    </Box>
                  )}
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h3" gutterBottom>
                      Students
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                      Top 5 Scorers
                    </Typography>
                    <TopStudents />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <Calender /> */}
            <EventDummy />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const styles = {
  cardWrapper: {
    display: "flex",
    flexFlow: "row wrap",
    paddingTop: "20px",
  },
  card: {
    display: "flex",
    border: "0",
    borderRadius: "10px",
    boxShadow: "0px 0px 31px 3px rgba(44, 50, 63, 0.02)",
  },
  cardBody: {
    padding: "10px",
    display: "flex",
    flex: "0 0 100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  graphCard1: {
    padding: "10px",
    background: "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
  },
  graphCard2: {
    padding: "10px",
    background: "linear-gradient(195deg, #fbb3b3, #c43333)",
  },
};

DashBoard.contextType = AuthContext;
