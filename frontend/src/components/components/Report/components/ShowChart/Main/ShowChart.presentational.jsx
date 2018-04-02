// modules
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import isAfter from 'date-fns/is_after'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { Pickers } from '../../../../../../helper/functions/common.helper.component'
import { BarChart, Buttons } from './ShowChart.helper.component'


export default class ShowChart extends React.Component {
  constructor(props) {
    super(props)
    this.handleUpdateChart = this._handleUpdateChart.bind(this)
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

  render() {
    return (
      <div>
        <Pickers {...this.props} {...this.state} />
        <Buttons {...this.props} handleUpdateChart={this.handleUpdateChart} />
        <Divider />
        <BarChart {...this.props} />
      </div>
    )
  }
}

ShowChart.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  updateChart: PropTypes.func.isRequired,
}
