// modules
import React from "react";
// helpers
import {
  TagPanel,
  Pickers
} from "../../../../../helper/functions/common.helper.component";
import { Buttons, CSVDownloader } from "./Custom.helper.component";

export default props => (
  <React.Fragment>
    <Pickers {...props} />
    <TagPanel {...props} />
    <Buttons {...props} />
    <CSVDownloader {...props} />
  </React.Fragment>
);
