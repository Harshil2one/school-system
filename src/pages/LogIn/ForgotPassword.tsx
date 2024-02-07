import * as React from "react";
import {
  Typography,
  Grid,
  CssBaseline,
  Paper,
  Box,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ForgotPasswordController from "./ForgotPasswordController";
import { Link } from "react-router-dom";
import { routeConstants } from "../../utils/shared";

class ForgotPasswordPage extends ForgotPasswordController {
  render() {
    return (
      <Grid container component="main" style={styles.mainContainer}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          style={styles.backgroundImage}
        />
        <Grid
          item
          xs={12}
          sm={false}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box sx={styles.loginContainer}>
            <Avatar variant="circular">
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h3">
              Forgot Password
            </Typography>
            <Box
              component="form"
              onSubmit={this.updatePassword}
              style={styles.formContainer}
            >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                variant="filled"
                error={this.state.errors.email?.length}
                helperText={this.state.errors.email && this.state.errors.email}
                onKeyDown={() =>
                  this.setState({
                    errors: { ...this.state.errors, email: "" },
                  })
                }
              />
              <TextField
                margin="normal"
                fullWidth
                id="currentPassword"
                label="Current Password"
                name="currentPassword"
                type="password"
                variant="filled"
                error={this.state.errors.currentPassword?.length}
                helperText={
                  this.state.errors.currentPassword &&
                  this.state.errors.currentPassword
                }
                onKeyDown={() =>
                  this.setState({
                    errors: { ...this.state.errors, currentPassword: "" },
                  })
                }
              />
              <TextField
                margin="normal"
                fullWidth
                name="newPassword"
                label="New Password"
                type="text"
                id="newPassword"
                variant="filled"
                error={this.state.errors.newPassword?.length}
                helperText={
                  this.state.errors.newPassword && this.state.errors.newPassword
                }
                onKeyDown={() =>
                  this.setState({
                    errors: { ...this.state.errors, newPassword: "" },
                  })
                }
              />
              <TextField
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                variant="filled"
                error={this.state.errors.confirmPassword?.length}
                helperText={
                  this.state.errors.confirmPassword &&
                  this.state.errors.confirmPassword
                }
                onKeyDown={() =>
                  this.setState({
                    errors: { ...this.state.errors, confirmPassword: "" },
                  })
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={styles.submitButton}
              >
                Update Password
              </Button>
              <Grid container>
                <Link
                  to={routeConstants.LOGIN_PAGE}
                  style={{ color: "rgb(71, 161, 240)", textDecoration: "none" }}
                >
                  Go to Login
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default ForgotPasswordPage;

const styles = {
  mainContainer: {
    display: "flex",
    height: "100vh",
  },
  backgroundImage: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
  },
  loginContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px 64px",
  },
  formContainer: {
    width: "100%",
    maxWidth: "400px",
    marginTop: "20px",
  },
  submitButton: {
    marginTop: "20px",
    marginBottom: "10px",
  },
};
