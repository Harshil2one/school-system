import React, { Component } from "react";
import { Box } from "@material-ui/core";

export default class NotFound extends Component {
  render() {
    return (
      <Box sx={styles.mainContainer}>
        <img
          src={"/assets/notFound.png"}
          alt="404-Not Found"
          width={"50%"}
          height={"100%"}
        />
      </Box>
    );
  }
}

const styles = {
  mainContainer: {
    paddingTop: "30px",
    display: "flex",
    justifyContent: "center",
  },
};
