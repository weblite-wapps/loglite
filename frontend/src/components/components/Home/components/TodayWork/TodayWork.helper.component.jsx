// modules
import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import MuiCollapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
// icons
import Play from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
// helpers
import { formattedSeconds, formattedName } from "./TodayWork.helper";
// styles
import "./TodayWork.scss";

export const BriefInfo = ({ runningId, log: { _id, title }, workDuration }) => (
  <Typography variant="body2">
    {formattedName(title) === title ? (
      <span className="todayWork-title">{formattedName(title)}</span>
    ) : (
        <Tooltip
          title={title}
          placement="bottom"
          enterDelay={300}
          leaveDelay={300}
        >
          <span className="todayWork-title">{formattedName(title)}</span>
        </Tooltip>
      )} 
    <span className="todayWork-time">
      &nbsp;| {runningId === _id ? "Running..." : workDuration}
    </span>
  </Typography>
);

BriefInfo.propTypes = {
  runningId: PropTypes.string.isRequired,
  log: PropTypes.shape({}).isRequired,
  workDuration: PropTypes.string.isRequired
};

export const ActionButtons = ({
  log: { times },
  isLoading,
  len,
  onStart,
  onStop
}) => (
    <ListItemSecondaryAction>
      {len && times[len - 1].end === "running" ? (
        <IconButton disabled={isLoading} onClick={onStop}>
          <Pause className="todayWork-icon" />
        </IconButton>
      ) : (
          <IconButton disabled={isLoading} onClick={onStart}>
            <Play className="todayWork-icon" />
          </IconButton>
        )}
    </ListItemSecondaryAction>
  );

ActionButtons.propTypes = {
  log: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  len: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

export const Collapse = ({ runningId, log: { _id }, secondsElapsed }) => (
  <MuiCollapse
    component="li"
    in={_id === runningId}
    timeout="auto"
    unmountOnExit
  >
    <Divider light variant="inset" />
    <div className="todayWork-stopwatch">
      <Typography variant="subheading">
        {formattedSeconds(secondsElapsed)}
      </Typography>
    </div>
  </MuiCollapse>
);

Collapse.propTypes = {
  runningId: PropTypes.string.isRequired,
  log: PropTypes.shape({}).isRequired,
  secondsElapsed: PropTypes.number.isRequired
};
