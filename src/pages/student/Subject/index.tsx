import { Box, Typography } from "@material-ui/core";
import React from "react";
import SubjectTable from "./Table";

export default class SubjectPage extends React.Component {
  state = {
    isOpen: false,
    mode: "add",
  };
  render() {
    return (
      <Box>
        <Box sx={styles.flexItems}>
          <Typography variant="h5">Subjects</Typography>
        </Box>
        <SubjectTable />
      </Box>
    );
  }
}

const styles = {
  flexItems: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0px 10px 0px",
  },
};
