// modules
import React from "react";
import List from "@material-ui/core/List";
// helpers
import { Buttons, Collapse } from "./Custom.helper.component";
// styles
import "./Custom.scss";

export default props => (
  <div>
    <List disablePadding className="todayWork-list">
      <Buttons {...props} />
      <Collapse {...props} />
    </List>
  </div>
);
