// modules
import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
// components
import SelectBar from "../components/SelectBar/SelectBar.container.react";
// helpers
import {
  ControlBar,
  ExportPanel,
  BarChartPanel,
  WorkListPanel,
  LeaderboardPanel,
} from "./Report.helper.component";
// styles
import "./Report.scss";

export default props => (
  <div className="report-container">
    <div className="report-dashboard"> 
      <SelectBar /> 
      <ControlBar {...props} />
      <Divider light />
    </div>
    <List disablePadding style={{ 'marginTop': '210px' }}>
      <ExportPanel {...props} />
      <BarChartPanel {...props} />
      <WorkListPanel {...props} />
      <LeaderboardPanel {...props} />
    </List>
  </div>
);
