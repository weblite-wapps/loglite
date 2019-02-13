// modules
import React from "react";
import PropTypes from "prop-types";
// components
import CustomizedTextField from "../../../../helper/components/TextField/TextField.presentational";
// styles
import "./Add.scss";

export const TextField = ({ isError, title, onTitleChange }) => (
  <div className="add-textField">
    <CustomizedTextField
      label="Title"
      value={title}
      onChange={e => onTitleChange(e.target.value)}
      isError={isError.title}
    />
  </div>
);

TextField.propTypes = {
  isError: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired
};

export const nothing = null;
