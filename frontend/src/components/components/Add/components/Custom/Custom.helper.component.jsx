// modules
import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import MuiCollapse from "@material-ui/core/Collapse";
// components
import Button from "../../../../../helper/components/Button/Button.presentational";
import Picker from "../../../../../helper/components/Picker/Picker.presentational";
// styles
import "./Custom.scss";

export const Buttons = ({
  isLoading,
  title,
  selectedTags,
  onExpand,
  onAdd
}) => (
    <ListItem disableGutters>
      <div className="add-buttons">
        <Button label="Custom" onClick={onExpand} componentName="CustomAdd" />
        <Button
          disabled={isLoading}
          label="Add"
          onClick={() => onAdd(title, selectedTags)}
          componentName="Add"
        />
      </div>
    </ListItem>
  );

Buttons.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAdd: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired
};

export const Collapse = ({
  title,
  selectedTags,
  date,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  onDateChange,
  expanded,
  isError,
  onCustomAdd
}) => (
    <MuiCollapse component="li" in={expanded} timeout="auto" unmountOnExit>
      <Divider />
      <Picker
        label="Date"
        type="date"
        isError={isError.date}
        value={date}
        onChange={onDateChange}
      />
      <Picker
        label="Start time"
        type="time"
        isError={isError.startTime}
        value={startTime}
        onChange={onStartTimeChange}
      />
      <Picker
        label="End time"
        type="time"
        isError={isError.endTime}
        value={endTime}
        onChange={onEndTimeChange}
      />
      <div className="add-buttons">
        <Button
          label="Add"
          onClick={() =>
            onCustomAdd(title, selectedTags, date, startTime, endTime)
          }
          componentName="Add"
        />
      </div>
      <Divider />
    </MuiCollapse>
  );

Collapse.propTypes = {
  title: PropTypes.string.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  isError: PropTypes.shape({}).isRequired,
  onStartTimeChange: PropTypes.func.isRequired,
  onEndTimeChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onCustomAdd: PropTypes.func.isRequired
};
