// modules
import React from "react";
import PropTypes from "prop-types";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
// icons
import MdFlag from 'react-ionicons/lib/MdFlag' 
import ListAltIcon from "@material-ui/icons/ListAlt";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import InsertChartOutlinedIcon from "@material-ui/icons/InsertChartOutlined";
import ShowChartIcon from "@material-ui/icons/ShowChart";
// components
import Navigator from "../components/Navigator/Navigator.container.react";
import Button from "../../../../helper/components/Button/Button.presentational";
import ShowChart from "../components/ShowChart/ShowChart.container.react";
import Custom from "../components/Custom/Custom.container.react";
import WorkList from "../components/WorkList/Main/WorkList.container.react";
import PieChart from "../components/WorkList/components/PieChart.presentational";
import Leaderboard from "../components/Leaderboard/Leaderboard.container.react";
import Analysis from '../components/Analysis/Analysis.container'
// selectors
import {
  getWorksDuration,
  getStaffWorksDuration
} from "../../../../helper/selectors/workDuration.selector";
// helpers
import { formattedDate } from "../../../../helper/functions/date.helper";
import { secondary_color } from '../../../../helper/style/_color'
// styles
import "./Report.scss";

const IconButton = ({ expandMode, changeExpandMode, mode }) => (
  <Button
    variant={expandMode === mode ? "contained" : "outlined"}
    onClick={mode === "analysis" ? () => {} : () => changeExpandMode(mode)}
    componentName="Report"
  >
    {mode === "workList" && <ListAltIcon />}
    {mode === "export" && <ImportExportIcon />}
    {mode === "showChart" && <InsertChartOutlinedIcon />}
    {mode === "leaderboard" && <MdFlag fontSize="30px" color={secondary_color} beat />} 
    {/* {mode === "analysis" && <ShowChartIcon />} */}
  </Button>
)

IconButton.propTypes = {
  expandMode: PropTypes.string.isRequired,
  changeExpandMode: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired
};

export const ControlBar = props => (
  <div className="report-controlBar">
    <Navigator isActive={props.expandMode === "workList"} />
    <IconButton {...props} mode="workList" />
    <IconButton {...props} mode="export" />
    <IconButton {...props} mode="showChart" />
    <IconButton {...props} mode="leaderboard" />
    {/* <IconButton {...props} mode="analysis" /> */}

    {/* comming soon */}
    {/* <Tooltip 
      title="Coming Soon! :D"
      placement="bottom"
      enterDelay={50}
      leaveDelay={150}
    >
      <Button
        variant="outlined"
        onClick={() => {}}
        componentName="Report"
      >
        <ShowChartIcon />
      </Button>
    </Tooltip> */}
    {/* comming soon */}
  </div>
);

ControlBar.propTypes = {
  expandMode: PropTypes.string.isRequired
};

export const ExportPanel = ({ expandMode, totalDurationFromServer }) => (
  <Collapse
    component="li"
    in={expandMode === "export"}
    timeout="auto"
    unmountOnExit
  >
    <Custom />
    <Divider light />
    <div className="report-text">
      <Typography variant="subheading">{totalDurationFromServer}</Typography>
    </div>
    <Divider light />
  </Collapse>
);

ExportPanel.propTypes = {
  expandMode: PropTypes.string.isRequired,
  totalDurationFromServer: PropTypes.string.isRequired
};

export const BarChartPanel = ({ expandMode }) => (
  <Collapse
    component="li"
    in={expandMode === "showChart"}
    timeout="auto"
    unmountOnExit
  >
    <ShowChart />
    <Divider light />
  </Collapse>
);

BarChartPanel.propTypes = {
  expandMode: PropTypes.string.isRequired
};

export const LeaderboardPanel = ({ expandMode }) => (
  <Collapse
    component="li"
    in={expandMode === "leaderboard"}
    timeout="auto"
    unmountOnExit
  >
    <Leaderboard />
    <Divider light />
  </Collapse>
);

LeaderboardPanel.propTypes = {
  expandMode: PropTypes.string.isRequired
};

export const AnalysisPanel = ({ expandMode }) => (
  <Collapse
    component="li"
    in={expandMode === "analysis"}
    timeout="auto"
    unmountOnExit
  >
    <Analysis />
    <Divider light />
  </Collapse>
);

AnalysisPanel.propTypes = {
  expandMode: PropTypes.string.isRequired
};


export const WorkListPanel = ({
  selectedUser,
  userId,
  expandMode,
  totalDuration,
  staffTotalDuration,
  pieChartData,
  staffPieChartData,
  logs,
  staffLogs,
  currentPage
}) => {
  const getDuration =
    selectedUser === userId ? getWorksDuration : getStaffWorksDuration;

  return (
    <Collapse
      component="li"
      in={expandMode === "workList"}
      timeout="auto"
      unmountOnExit
    >
      <div className="report-text">
        <Typography variant="subheading">
          {selectedUser === userId ? totalDuration : staffTotalDuration}
        </Typography>
      </div>
      <Divider light />

      <div className="report-chart">
        <PieChart
          pieChartData={
            selectedUser === userId ? pieChartData : staffPieChartData
          }
        />
      </div>
      <Divider light />

      {(selectedUser === userId ? logs : staffLogs)
        .filter(log => log.date === formattedDate(currentPage))
        .map(log => (
          <WorkList key={log._id} log={log} getDuration={getDuration} />
        ))}
    </Collapse>
  );
};

WorkListPanel.propTypes = {
  userId: PropTypes.string.isRequired,
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  staffLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.instanceOf(Date).isRequired,
  totalDuration: PropTypes.string.isRequired,
  staffTotalDuration: PropTypes.string.isRequired,
  pieChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  staffPieChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedUser: PropTypes.string.isRequired,
  expandMode: PropTypes.string.isRequired
};
