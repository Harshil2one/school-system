import React from "react";
import SubjectController from "./SubjectController";
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
} from "@material-ui/core";
import { AuthContext } from "../../../../routes/AppRouteController";

export default class SubjectDialog extends SubjectController {
  render() {
    return (
      <Dialog open={this.props.isOpen} fullWidth>
        <Box
          component="form"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            this.addUpdateSubject(event);
          }}
        >
          <DialogTitle>
            <Typography variant="h5">Subject Info</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="none"
                  fullWidth
                  id="code"
                  label="Subject Id"
                  type="text"
                  name="code"
                  value={
                    this.props.mode === "edit"
                      ? this.props.selectedSubject?.code
                      : "SUBXX"
                  }
                  variant="outlined"
                  size="small"
                  aria-readonly
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel>Expert</InputLabel>
                  <Select
                    label="Expert"
                    name="expert"
                    defaultValue={
                      this.props.mode === "edit"
                        ? this.props.selectedSubject?.expert
                        : ""
                    }
                  >
                    {this.context.teachers?.map((menuItem: any) => {
                      return (
                        <MenuItem value={menuItem.name} key={menuItem.id}>
                          {menuItem.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  margin="none"
                  fullWidth
                  id="name"
                  label="Subject Name"
                  type="text"
                  name="name"
                  defaultValue={
                    this.props.mode === "edit"
                      ? this.props.selectedSubject?.name
                      : ""
                  }
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
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

SubjectDialog.contextType = AuthContext;
