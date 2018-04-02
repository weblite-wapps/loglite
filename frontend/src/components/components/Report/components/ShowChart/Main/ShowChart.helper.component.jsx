// modules
import React from 'react'
import PropTypes from 'prop-types'
import subDays from 'date-fns/sub_days'
// components
import Button from '../../../../../../helper/components/Button/Button.presentational'
import CustomizedBarChart from '../components/BarChart.presentational'
// helpers
import { formattedDate } from '../../../../../../helper/functions/date.helper'
// styles
import scssClasses from './ShowChart.scss'


export const Buttons = ({ updateChart, handleUpdateChart }) => (
  <React.Fragment>
    <div className={scssClasses.insertButton}>
      <Button label="Insert Chart" onClick={handleUpdateChart} componentName="Add" />
    </div>
    <div className={scssClasses.buttons}>
      <Button
        label="This Week"
        onClick={() =>
          updateChart(formattedDate(subDays(new Date(), 6)), formattedDate(new Date()))}
        componentName="CustomAdd"
      />
      <Button
        label="This Month"
        onClick={() =>
          updateChart(formattedDate(subDays(new Date(), 29)), formattedDate(new Date()))}
        componentName="CustomAdd"
      />
    </div>
  </React.Fragment>
)

Buttons.propTypes = {
  updateChart: PropTypes.func.isRequired,
  handleUpdateChart: PropTypes.func.isRequired,
}


export const BarChart = ({ barChartData }) => (
  barChartData.length ?
    <div className={scssClasses.chart}>
      <CustomizedBarChart barChartData={barChartData} />
    </div> : null
)

BarChart.propTypes = {
  barChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
}
