// modules
import React from "react";
import Typography from "@material-ui/core/Typography";
// styles
import "./About.scss";

export default () => (
  <div className="about-container">
    <img alt="loglite about" src="about.jpg" align="middle" />
    <Typography variant="subtitle1" align="center" gutterBottom>
      Version 2.0.0
    </Typography>
    <Typography variant="subtitle1" align="center" gutterBottom>
      All right reserved
    </Typography>
  </div>
);
