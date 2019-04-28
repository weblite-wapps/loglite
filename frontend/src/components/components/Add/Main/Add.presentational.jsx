// modules
import React, { Suspense, lazy } from 'react';
// helpers
import { TagPanel } from "../../../../helper/functions/common.helper.component";
import { TextField } from "./Add.helper.component";
// styles
import "./Add.scss";
// lazy loading
const Custom = lazy(() => import('../components/Custom/Custom.container.react'));

export default props => (
  <div className="add-container">
    <TextField {...props} />
    <TagPanel {...props} />

    <Suspense fallback={<div>Loading...</div>}>
      <Custom {...props} />
    </Suspense>
  </div>
);
