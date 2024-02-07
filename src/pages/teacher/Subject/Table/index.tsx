import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import TableController, { SubjectData } from "./TableController";
import SubjectDialog from "../Popup/SubjectPopup";
import { AuthContext } from "../../../../routes/AppRouteController";
import AddIcon from "@material-ui/icons/Add";

export default class SubjectTable extends TableController {
  render() {
    return (
      <>
        <SubjectDialog
          isOpen={this.state.isOpen}
          setIsOpen={(isOpen: boolean) => this.setState({ isOpen })}
          selectedSubject={this.state.selectedSubject as SubjectData}
          mode={this.state.mode}
          setSubjects={(subjects) => this.setState({ subjects })}
        />
        <Card>
          <CardContent>
            <Box style={styles.flexItems}>
              <Typography variant="h5" gutterBottom>
                Subjects
              </Typography>
              <Button
                variant="contained"
                onClick={() => this.setState({ isOpen: true, mode: "add" })}
              >
                <AddIcon /> Add
              </Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableCell>No.</TableCell>
                  <TableCell>Subject Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Expert</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableHead>
                <TableBody>
                  {this.state.subjects?.map(
                    (row: SubjectData, index: number) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.code}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.expert}</TableCell>
                        <TableCell
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ cursor: "pointer", color: "green" }}
                            onClick={() => this.handleEditSubject(row)}
                          >
                            Edit
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() =>
                              this.handleDeleteSubject(Number(row.id))
                            }
                          >
                            Remove
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </>
    );
  }
}

const styles = {
  flexItems: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px 10px 0px",
  },
};

SubjectTable.contextType = AuthContext;
