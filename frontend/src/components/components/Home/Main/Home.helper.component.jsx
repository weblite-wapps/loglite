// modules
import React from "react";
import PropTypes from "prop-types";
import Fab from '@material-ui/core/Fab';
import Tooltip from "@material-ui/core/Tooltip";
// icons
import FlashOnIcon from "@material-ui/icons/FlashOn";
// components
import TodayWork from "../components/TodayWork/TodayWork.container.react";
// helpers
import { checkIsRunning } from "./Home.helper";
import { formattedDate } from "../../../../helper/functions/date.helper";
// styles
import "./Home.scss";

export const TodayWorkList = ({ logs }) =>
  logs
    .filter(
      log => log.date === formattedDate(new Date()) || checkIsRunning(log)
    )
    .map(log => <TodayWork key={log._id} log={log} />);

TodayWorkList.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object).isRequired
};

export const FabButton = ({ onClick }) => (
  <div className="home-button">
    <Tooltip
      title="Quick add"
      placement="left"
      enterDelay={50}
      leaveDelay={150}
    >
      <Fab onClick={onClick}>
        <FlashOnIcon />
      </Fab>
    </Tooltip>
  </div>
);

FabButton.propTypes = { onClick: PropTypes.func.isRequired };
