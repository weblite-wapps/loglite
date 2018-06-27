// modules
import React from 'react'
import Divider from '@material-ui/core/Divider'
// helpers
import { Pickers } from '../../../../../../helper/functions/common.helper.component'
import { BarChart, Buttons } from './ShowChart.helper.component'


export default props => (
  <React.Fragment>
    <Pickers {...props} />
    <Buttons {...props} />
    <Divider />
    <BarChart {...props} />
  </React.Fragment>
)
