// modules
import React from 'react'
import Divider from '@material-ui/core/Divider'
// helpers
import {
  Pickers,
  BarChart,
  Buttons,
} from '../../../../../helper/functions/common.helper.component'

export default props => (
  <>
    <Pickers {...props} />
    <Buttons {...props} />
    <Divider />
    <BarChart {...props} XDataKey="name" YDataKey="duration" />
  </>
)
