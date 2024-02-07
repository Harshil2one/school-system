import React from "react";
import { Box, Divider, Link, Typography } from "@material-ui/core";
import { AuthContext } from "../../routes/AppRouteController";
import { HISTORY, routeConstants } from "../../utils/shared";
import { FacebookIcon } from "../../assets/assets";

class Footer extends React.Component {
  static contextType = AuthContext;
  render() {
    return (
      <Box
        style={{
          display:
            HISTORY.location.pathname === routeConstants.LOGIN_PAGE ||
            HISTORY.location.pathname === routeConstants.FORGOT_PASSWORD_PAGE
              ? "none"
              : "block",
        }}
      >
        <Divider style={styles.divider} />
        <Box
          style={{
            ...styles.root,
          }}
        >
          <Typography variant="subtitle1">
            Copyright © 2024 | Powered by{" "}
            <a
              href={"https://www.tatvasoft.com/"}
              target="_blank"
              style={styles.linkStyle}
              rel="noreferrer"
            >
              Tatvasoft
            </a>
          </Typography>
          <Link href="https://www.facebook.com/TatvaSoft" target="_blank">
            <img src={FacebookIcon} alt="Facebook" style={styles.image} />
          </Link>
        </Box>
      </Box>
    );
  }
}

export default Footer;

const styles = {
  divider: {
    marginTop: "50px",
  },
  root: {
    display: "flex",
    padding: "15px 0",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkStyle: { textDecoration: "none", color: "#47A1F0" },
  image: {
    maxWidth: "100%",
    display: "block",
    height: "30px",
  },
};
