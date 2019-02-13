// modules
import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
// components
import SelectBar from "../components/SelectBar/SelectBar.container.react";
// helpers
import {
  ControllBar,
  ExportPanel,
  BarChartPanel,
  WorkListPanel,
  LeaderboardPanel
} from "./Report.helper.component";
// styles
import "./Report.scss";

export default props => (
  <div className="report-container">
    <SelectBar />
    <ControllBar {...props} />
    <Divider light />
    <List disablePadding className="report-list">
      <ExportPanel {...props} />
      <BarChartPanel {...props} />
      <WorkListPanel {...props} />
      <LeaderboardPanel {...props} />
    </List>
  </div>
);
