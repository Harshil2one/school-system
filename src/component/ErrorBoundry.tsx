import React from "react";
import { Box, Typography } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { PlanetIcon } from "../assets/assets";

export class ErrorBoundary extends React.Component {
  state = { error: null };

  componentDidCatch(error: Error): void {
    this.setState({
      error: error,
    });
  }

  render() {
    if (this.state?.error) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={PlanetIcon} alt="500" style={styles.image} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ErrorOutlineIcon color="error" /> &nbsp;
            <Typography variant="h6">Something went wrong.</Typography>
          </Box>
          <Typography variant="subtitle1">
            Please reload the page or try again
          </Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

const styles = {
  container: {},
  image: { maxWidth: "100%", display: "block", height: "auto" },
};
