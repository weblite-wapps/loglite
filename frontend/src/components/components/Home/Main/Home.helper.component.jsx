// modules
import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
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
    <Button variant="fab" onClick={onClick}>
      <AddIcon />
    </Button>
  </div>
);

FabButton.propTypes = { onClick: PropTypes.func.isRequired };
