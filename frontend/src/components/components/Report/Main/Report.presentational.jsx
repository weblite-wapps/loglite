// modules
import React from 'react'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'
// components
import SelectBar from '../components/SelectBar/SelectBar.container.react'
// helpers
import { ControllBar, ExportPanel, BarChartPanel, WorkListPanel } from './Report.helper.component'
// scssClasses
import scssClasses from './Report.scss'


export default props => (
  <div className={scssClasses.container}>
    <SelectBar />
    <ControllBar {...props} />
    <Divider light />
    <List disablePadding className={scssClasses.list}>
      <ExportPanel {...props} />
      <BarChartPanel {...props} />
      <WorkListPanel {...props} />
    </List>
  </div>
)
