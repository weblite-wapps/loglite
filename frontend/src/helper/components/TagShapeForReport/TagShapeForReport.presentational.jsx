// modules
import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
// styles
import "./TagShapeForReport.scss";

const TagShape = ({ tag }) => (
  <div className="tagShapeForReport-container">
    <div className="tagShapeForReport-content">
      <Typography variant="body1">{tag}</Typography>
    </div>
  </div>
);

TagShape.propTypes = {
  tag: PropTypes.string.isRequired
};

export default TagShape;
