import {
  Card,
  TextField,
  Button,
  CardContent,
  Grid,
  Typography,
  Box,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";
import React from "react";
import ProfileController from "./ProfileController";
import { AuthContext } from "../../../routes/AppRouteController";

export default class ProfilePage extends ProfileController {
  render() {
    const {
      profile_img,
      name,
      email,
      mobile,
      experience,
      degree,
      address,
      city,
      state,
      country,
      zipCode,
    } = JSON.parse(localStorage.getItem("userDetails") || "{}");

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent style={styles.profileCard}>
              <Typography
                variant="h5"
                style={{ ...styles.header, borderBottom: "none" }}
              >
                Profile
              </Typography>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  name="profile_img"
                  onChange={this.handleImageChange}
                  ref={(ref) => (this.fileInput = ref)}
                />
                <Avatar
                  src={this.state.image !== "" ? this.state.image : profile_img}
                  style={{
                    width: "150px",
                    height: "150px",
                    cursor: "pointer",
                  }}
                  onClick={this.handleAvatarClick}
                />
              </div>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">{name}</Typography>
                <Typography
                  variant="subtitle2"
                  style={styles.passwordLink}
                  onClick={() =>
                    this.setState({
                      isPasswordChange: !this.state.isPasswordChange,
                    })
                  }
                >
                  {this.state.isPasswordChange
                    ? "Personal Details"
                    : "Change Password"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          component="form"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            this.handleSubmitData(event)
          }
          onReset={this.resetForm}
        >
          <Card>
            <CardContent style={{ padding: "16px 20px" }}>
              {!this.state.isPasswordChange ? (
                <Box>
                  <Typography variant="h5" style={styles.header}>
                    Personal Details
                  </Typography>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        margin="none"
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        variant="outlined"
                        defaultValue={name}
                        multiline
                        size="small"
                        error={this.state.errors.name?.length}
                        helperText={
                          this.state.errors.name && this.state.errors.name
                        }
                        onKeyDown={() =>
                          this.setState({
                            errors: { ...this.state.errors, name: "" },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        margin="none"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        variant="outlined"
                        defaultValue={email}
                        multiline
                        size="small"
                        error={this.state.errors.email?.length}
                        helperText={
                          this.state.errors.email && this.state.errors.email
                        }
                        onKeyDown={() =>
                          this.setState({
                            errors: { ...this.state.errors, email: "" },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        margin="none"
                        fullWidth
                        id="mobile"
                        label="Mobile Number"
                        name="mobile"
                        variant="outlined"
                        defaultValue={mobile}
                        multiline
                        size="small"
                        error={this.state.errors.mobile?.length}
                        helperText={
                          this.state.errors.mobile && this.state.errors.mobile
                        }
                        onKeyDown={() =>
                          this.setState({
                            errors: { ...this.state.errors, mobile: "" },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel>Graduation</InputLabel>
                        <Select
                          label="Graduation"
                          name="degree"
                          defaultValue={degree}
                          error={this.state.errors.degree?.length}
                          onChange={() =>
                            this.setState({
                              errors: { ...this.state.errors, degree: "" },
                            })
                          }
                        >
                          {this.state.degreeList?.map(
                            (menuItem: { value: number; label: string }) => {
                              return (
                                <MenuItem
                                  value={menuItem.label}
                                  key={menuItem.value}
                                >
                                  {menuItem.label}
                                </MenuItem>
                              );
                            }
                          )}
                        </Select>
                        <FormHelperText>
                          {this.state.errors.degree && this.state.errors.degree}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <TextField
                        margin="none"
                        fullWidth
                        name="experience"
                        label="Experience(In Years)"
                        type="text"
                        id="experience"
                        variant="outlined"
                        defaultValue={experience}
                        multiline
                        size="small"
                        error={this.state.errors.experience?.length}
                        helperText={
                          this.state.errors.experience &&
                          this.state.errors.experience
                        }
                        onKeyDown={() =>
                          this.setState({
                            errors: { ...this.state.errors, experience: "" },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        margin="none"
                        required
                        fullWidth
                        name="address"
                        label="Address"
                        type="text"
                        id="address"
                        variant="outlined"
                        size="small"
                        multiline
                        defaultValue={address}
                        minRows={4}
                        error={this.state.errors.address?.length}
                        helperText={
                          this.state.errors.address && this.state.errors.address
                        }
                        onKeyDown={() =>
                          this.setState({
                            errors: { ...this.state.errors, address: "" },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <TextField
                        margin="none"
                        fullWidth
                        name="city"
                        label="City"
                        type="text"
                        id="city"
                        variant="outlined"
                        defaultValue={city}
                        size="small"
                        multiline
                        error={this.state.errors.city?.length}
                        helperText={
                          this.state.errors.city && this.state.errors.city
                        }
                        onKeyDown={() =>
                          this.setState({
                            errors: { ...this.state.errors, city: "" },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel>State</InputLabel>
                        <Select
                          label="State"
                          name="state"
                          defaultValue={state}
                          error={this.state.errors.state?.length}
                          onChange={() =>
                            this.setState({
                              errors: { ...this.state.errors, state: "" },
                            })
                          }
                        >
                          {this.state.stateList?.map(
                            (menuItem: {
                              name: string;
                              state_code: string;
                            }) => {
                              return (
                                <MenuItem
                                  value={menuItem.state_code}
                                  key={menuItem.state_code}
                                >
                                  {menuItem.name}
                                </MenuItem>
                              );
                            }
                          )}
                        </Select>
                        <FormHelperText>
                          {this.state.errors.state && this.state.errors.state}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel>Country</InputLabel>
                        <Select
                          label="Country"
                          name="country"
                          disabled
                          defaultValue={country}
                          error={this.state.errors.country?.length}
                          onChange={() =>
                            this.setState({
                              errors: { ...this.state.errors, country: "" },
                            })
                          }
                        >
                          {this.state.countryList?.map(
                            (menuItem: {
                              name: string;
                              country_code: string;
                            }) => {
                              return (
                                <MenuItem
                                  value={menuItem.country_code}
                                  key={menuItem.country_code}
                                >
                                  {menuItem.name}
                                </MenuItem>
                              );
                            }
                          )}
                        </Select>
                        <FormHelperText>
                          {this.state.errors.country &&
                            this.state.errors.country}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <TextField
                        margin="none"
                        fullWidth
                        name="zipCode"
                        label="ZipCode"
                        type="text"
                        id="zipCode"
                        variant="outlined"
                        defaultValue={zipCode}
                        multiline
                        size="small"
                        error={this.state.errors.zipCode?.length}
                        helperText={
                          this.state.errors.zipCode && this.state.errors.zipCode
                        }
                        onKeyDown={() =>
                          this.setState({
                            errors: { ...this.state.errors, zipCode: "" },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h5" style={styles.header}>
                    Change Password
                  </Typography>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        margin="none"
                        fullWidth
                        id="currentPassword"
                        label="Current Password"
                        type="password"
                        name="currentPassword"
                        defaultValue={
                          this.state.passwordChanges.currentPassword
                        }
                        variant="outlined"
                        size="small"
                        error={this.state.errors.currentPassword?.length}
                        helperText={
                          this.state.errors.currentPassword &&
                          this.state.errors.currentPassword
                        }
                        onKeyDown={() =>
                          this.setState({
                            errors: {
                              ...this.state.errors,
                              currentPassword: "",
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        margin="none"
                        fullWidth
                        id="newPassword"
                        label="New Password"
                        type="text"
                        name="newPassword"
                        defaultValue={this.state.passwordChanges.newPassword}
                        variant="outlined"
                        size="small"
                        error={this.state.errors.newPassword?.length}
                        helperText={
                          this.state.errors.newPassword &&
                          this.state.errors.newPassword
                        }
                        onKeyDown={() =>
                          this.setState({
                            errors: { ...this.state.errors, newPassword: "" },
                          })
                        }
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        margin="none"
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        defaultValue={
                          this.state.passwordChanges.confirmPassword
                        }
                        variant="outlined"
                        size="small"
                        error={this.state.errors.confirmPassword?.length}
                        helperText={
                          this.state.errors.confirmPassword &&
                          this.state.errors.confirmPassword
                        }
                        onKeyDown={() =>
                          this.setState({
                            errors: {
                              ...this.state.errors,
                              confirmPassword: "",
                            },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
          <Box sx={styles.buttonGrid}>
            <Button type="submit" variant="contained" style={styles.button}>
              {this.state.isPasswordChange
                ? "Update Password"
                : "Update Details"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="reset"
              style={styles.button}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

const styles = {
  header: {
    borderBottom: "3px solid #f4f9fd",
  },
  profileCard: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  passwordLink: {
    cursor: "pointer",
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

ProfilePage.contextType = AuthContext;
