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
import LoginController from "./LogInController";
import { Link } from "react-router-dom";
import { routeConstants } from "../../utils/shared";

class LogIn extends LoginController {
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
            <Typography  variant="h3">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={this.handleLogin}
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
                // autoComplete="off"
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
                name="password"
                label="Password"
                type="password"
                id="password"
                variant="filled"
                error={this.state.errors?.password?.length}
                helperText={
                  this.state.errors.password && this.state.errors.password
                }
                onKeyDown={() =>
                  this.setState({
                    errors: { ...this.state.errors, password: "" },
                  })
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={styles.submitButton}
              >
                Sign In
              </Button>
              <Grid container>
                <Link
                  to={routeConstants.FORGOT_PASSWORD_PAGE}
                  style={{ color: "rgb(71, 161, 240)", textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default LogIn;

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
    padding: "64px",
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
