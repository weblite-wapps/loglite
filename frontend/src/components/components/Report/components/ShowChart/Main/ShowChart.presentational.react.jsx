// modules
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import isAfter from 'date-fns/is_after'
import subDays from 'date-fns/sub_days'
import format from 'date-fns/format'
// components
import StartDatePicker from '../../Custom/components/StartDatePicker/StartDatePicker.container.react'
import EndDatePicker from '../../Custom/components/EndDatePicker/EndDatePicker.container.react'
import Button from '../../../../common/Button/Button.presentational.react'
import BarChart from '../components/BarChart.presentational.react'
// scssClasses
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
    const { startDate, endDate, updateChart, changeSnackbarStage } = this.props
    if (startDate && endDate) {
      if (isAfter(new Date(endDate), new Date(startDate))) {
        updateChart(startDate, endDate)
      } else {
        this.setState({ startDateIsError: true })
        this.setState({ endDateIsError: true })
        changeSnackbarStage(true, 'StartDate is after EndDate!')
      }
    } else if (!startDate) {
      this.setState({ startDateIsError: true })
      changeSnackbarStage(true, 'Choose start date!')
    } else {
      this.setState({ endDateIsError: true })
      changeSnackbarStage(true, 'Choose end date!')
    }
  }

  _handleInsertThisWeek() {
    this.props.updateChart(
      format(subDays(new Date(), 6), 'YYYY-MM-DD'), format(new Date(), 'YYYY-MM-DD'))
  }

  _handleInsertThisMonth() {
    this.props.updateChart(
      format(subDays(new Date(), 29), 'YYYY-MM-DD'), format(new Date(), 'YYYY-MM-DD'))
  }

  render() {
    const { startDateIsError, endDateIsError } = this.state
    const { barChartData } = this.props
    return (
      <div>
        <StartDatePicker isError={startDateIsError} />
        <EndDatePicker isError={endDateIsError} />
        <div className={scssClasses.insertButton}>
          <Button label="Insert Chart" onClick={this.handleUpdateChart} />
        </div>
        <div className={scssClasses.buttons}>
          <Button isCustome label="This Week" onClick={this.handleInsertThisWeek} />
          <Button isCustome label="This Month" onClick={this.handleInsertThisMonth} />
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
  changeSnackbarStage: PropTypes.func.isRequired,
}
