import React from "react";
import BarChart from "../../../component/Charts/BarChart";
import {
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  CardMedia,
  Avatar,
} from "@material-ui/core";
import PieChart from "../../../component/Charts/PieChart";
import DashboardController from "./DashboardController";
import { AuthContext } from "../../../routes/AppRouteController";
import LineChart from "../../../component/Charts/LineChart";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import {
  AchievementIcon,
  AttendanceIcon,
  PerformanceIcon,
  ProjectIcon,
  RankIcon,
  TestIcon,
} from "../../../assets/assets";

export default class DashBoard extends DashboardController {
  render() {
    const {
      name,
      standard,
      division,
      attendance,
      leaves,
      rank,
      enroll_no,
      class_strength,
      subjectReport,
      completed_projects,
      profile_img,
      attempted_tests,
      total_tests,
    } = this.state.dashboardData;

    return (
      <Box>
        {this.state.isStudentRedirect && (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingTop: "10px",
            }}
          >
            <ArrowBackIcon
              fontSize="medium"
              onClick={this.handleBack}
              cursor="pointer"
            />
            <Typography variant="h3">
              {this.state.dashboardData.name}
            </Typography>
          </Box>
        )}
        <br />
        <Grid container spacing={3} style={styles.cardWrapper}>
          <Grid item xs={12} sm={12} md={3} style={styles.card}>
            <Card
              style={{
                ...styles.cardBody,
                flexFlow: "column",
                padding: 0,
              }}
            >
              <CardMedia
                component="img"
                style={{ height: "100px", width: "100%" }}
                src={
                  "https://alcs-profile-card.netlify.app/images/bg-pattern-card.svg"
                }
              />
              <Grid container alignItems="center" direction="column">
                <Grid item>
                  <Avatar
                    src={profile_img}
                    alt="Profile"
                    style={{
                      marginBottom: "-30px",
                      marginTop: "-40px",
                      height: "80px",
                      width: "80px",
                      boxShadow: "0 0 10px black",
                    }}
                  />
                </Grid>
                <Grid item>
                  <CardContent style={{ paddingTop: "40px" }}>
                    <Typography
                      variant="h3"
                      gutterBottom
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {name}
                    </Typography>
                    <Typography variant="body1">
                      <b>Name :</b> {name}
                    </Typography>
                    <Typography variant="body1">
                      <b>Enroll No. :</b> {enroll_no}
                    </Typography>
                    <Typography variant="body1">
                      <b>Class :</b> {standard}
                    </Typography>
                    <Typography variant="body1">
                      <b>Division :</b> {division}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3} style={styles.sideCard}>
            <Card style={styles.sideCardBody}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Class Rank
                </Typography>
                <Typography variant="h3">
                  {rank} of {class_strength}
                </Typography>
              </CardContent>
              <img
                src={RankIcon}
                alt="Rank"
                style={{ paddingRight: "20px" }}
                height={80}
              />
            </Card>
            <Card style={styles.sideCardBody}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Tests (attempted/total)
                </Typography>
                <Typography variant="h3">
                  {attempted_tests}/{total_tests}
                </Typography>
              </CardContent>
              <img
                src={TestIcon}
                alt="Performance"
                style={{ paddingRight: "20px" }}
                height={80}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3} style={styles.sideCard}>
            <Card style={styles.sideCardBody}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Performance
                </Typography>
                <Typography variant="h3">
                  {this.calculatePerformance(subjectReport)}
                </Typography>
              </CardContent>
              <img
                src={PerformanceIcon}
                alt="Performance"
                style={{ paddingRight: "20px" }}
                height={80}
              />
            </Card>
            <Card style={styles.sideCardBody}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Total Projects
                </Typography>
                <Typography variant="h3">{completed_projects}</Typography>
              </CardContent>
              <img
                src={ProjectIcon}
                alt="Attendance"
                style={{ paddingRight: "20px" }}
                height={80}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3} style={styles.sideCard}>
            <Card style={styles.sideCardBody}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Achievement
                </Typography>
                <Typography variant="h3">
                  {rank} of {class_strength}
                </Typography>
              </CardContent>
              <img
                src={AchievementIcon}
                alt="Rank"
                style={{ paddingRight: "20px" }}
                height={80}
              />
            </Card>
            <Card style={styles.sideCardBody}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Attendance
                </Typography>
                <Typography variant="h3">{attendance}</Typography>
              </CardContent>
              <img
                src={AttendanceIcon}
                alt="Attendance"
                style={{ paddingRight: "20px" }}
                height={80}
              />
            </Card>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card style={styles.graphCard1}>
              {this.state.isStudentRedirect ? (
                <LineChart
                  title="Subject Info"
                  tooltip="Subjects"
                  graphData={subjectReport?.map((el: any) => el.mark)}
                  key="mark"
                  labels={subjectReport?.map((el: any) => el.subject)}
                />
              ) : subjectReport?.length ? (
                <BarChart
                  title="Grade Info"
                  tooltip="Subjects"
                  graphData={subjectReport?.map((el: any) => el.mark)}
                  key="mark"
                  labels={subjectReport?.map((el: any) => el.subject)}
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
              {attendance || leaves ? (
                <PieChart
                  data={[attendance, leaves]}
                  key="attendance"
                  title="Attendance Info"
                  tooltip={["Attendance", "Leaves"]}
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
        </Grid>
      </Box>
    );
  }
}

const styles = {
  cardWrapper: {
    display: "flex",
    flexFlow: "row wrap",
    paddingTop: "10px",
  },
  card: {
    display: "flex",
    border: "0",
    borderRadius: "10px",
    boxShadow: "0px 0px 31px 3px rgba(44, 50, 63, 0.02)",
  },
  sideCard: {
    display: "flex",
    flexFlow: "column",
  },
  sideCardBody: {
    padding: "10px",
    display: "flex",
    flex: "0 0 45.6%",
    marginBottom: "25px",
    alignItems: "center",
    justifyContent: "space-between",
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
