// modules
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import isAfter from 'date-fns/is_after'
import subDays from 'date-fns/sub_days'
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import StartDatePicker from '../../common/StartDatePicker/StartDatePicker.container.react'
import EndDatePicker from '../../common/EndDatePicker/EndDatePicker.container.react'
import Button from '../../../../../../helper/components/Button/Button.presentational.react'
import BarChart from '../components/BarChart.presentational.react'
// helpers
import { formattedDate } from '../../../../../../helper/functions/date.helper'
// css
import scssClasses from './ShowChart.scss'


export default class ShowChart extends React.Component {
  constructor(props) {
    super(props)
    this.handleUpdateChart = this._handleUpdateChart.bind(this)
    this.handleInsertThisWeek = this._handleInsertThisWeek.bind(this)
    this.handleInsertThisMonth = this._handleInsertThisMonth.bind(this)
    this.state = {
      startDateIsError: false,
      endDateIsError: false,
    }
  }

  _handleUpdateChart() {
    const { startDate, endDate, updateChart } = this.props
    if (startDate && endDate) {
      if (isAfter(new Date(endDate), new Date(startDate))) {
        updateChart(startDate, endDate)
      } else {
        this.setState({ startDateIsError: true })
        this.setState({ endDateIsError: true })
        snackbarMessage({ message: 'StartDate is after EndDate!' })
      }
    } else if (!startDate) {
      this.setState({ startDateIsError: true })
      snackbarMessage({ message: 'Choose start date!' })
    } else {
      this.setState({ endDateIsError: true })
      snackbarMessage({ message: 'Choose end date!' })
    }
  }

  _handleInsertThisWeek() {
    this.props.updateChart(
      formattedDate(subDays(new Date(), 6)), formattedDate(new Date()))
  }

  _handleInsertThisMonth() {
    this.props.updateChart(
      formattedDate(subDays(new Date(), 29)), formattedDate(new Date()))
  }

  render() {
    const { startDateIsError, endDateIsError } = this.state
    const { barChartData } = this.props
    return (
      <div>
        <StartDatePicker isError={startDateIsError} />
        <EndDatePicker isError={endDateIsError} />
        <div className={scssClasses.insertButton}>
          <Button label="Insert Chart" onClick={this.handleUpdateChart} componentName="Add" />
        </div>
        <div className={scssClasses.buttons}>
          <Button
            label="This Week"
            onClick={this._handleInsertThisWeek}
            componentName="CustomAdd"
          />
          <Button
            label="This Month"
            onClick={this.handleInsertThisMonth}
            componentName="CustomAdd"
          />
        </div>
        <Divider />
        {
          barChartData.length ?
            <div className={scssClasses.chart}>
              <BarChart barChartData={barChartData} />
            </div> : null
        }
      </div>
    )
  }
}

ShowChart.propTypes = {
  barChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  updateChart: PropTypes.func.isRequired,
}
