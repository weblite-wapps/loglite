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


export const Buttons = ({ startDate, endDate, updateChart, handleUpdateChart }) => (
  <React.Fragment>
    <div className={scssClasses.insertButton}>
      <Button
        label="Insert Chart"
        componentName="Add"
        onClick={() => handleUpdateChart(startDate, endDate)}
      />
    </div>
    <div className={scssClasses.buttons}>
      <Button
        label="This Week"
        componentName="CustomAdd"
        onClick={() =>
          updateChart(formattedDate(subDays(new Date(), 6)), formattedDate(new Date()))}
      />
      <Button
        label="This Month"
        componentName="CustomAdd"
        onClick={() =>
          updateChart(formattedDate(subDays(new Date(), 29)), formattedDate(new Date()))}
      />
    </div>
  </React.Fragment>
)

Buttons.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
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
