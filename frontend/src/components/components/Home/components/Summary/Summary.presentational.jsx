// modules
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// helpers
import { SliderText, DurationPanel } from "./Summary.helper.component";
// styles
import "./Summary.scss";
import styles from "./Summary.style";

const Summary = props => (
  <div className="summary-container">
    <SliderText text="You worked" variant="display1" />
    <SliderText text={props.duration} variant="display2" />
    <DurationPanel {...props} />
  </div>
);

Summary.propTypes = {
  duration: PropTypes.string.isRequired
};

export default withStyles(styles)(Summary);
