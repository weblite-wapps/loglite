// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { TagPanel, Pickers } from '../../../../../helper/functions/common.helper.component'
import { Buttons, CSVDownloader } from './Custom.helper.component'


export default class Custom extends React.Component {
  constructor(props) {
    super(props)
    this.handleCalculation = this._handleCalculation.bind(this)
    this.handleExport = this._handleExport.bind(this)
    this.handleAddTag = this._handleAddTag.bind(this)
    this.state = {
      startDateIsError: false,
      endDateIsError: false,
    }
  }

  _handleCalculation() {
    const { startDate, endDate, calculateTotalDuration } = this.props
    if (startDate && endDate) calculateTotalDuration()
    else if (!startDate) {
      this.setState({ startDateIsError: true })
      snackbarMessage({ message: 'Choose start date!' })
    } else {
      this.setState({ endDateIsError: true })
      snackbarMessage({ message: 'Choose end date!' })
    }
  }

  _handleExport() {
    const { startDate, endDate, convertJSONToCSV } = this.props
    if (startDate && endDate) convertJSONToCSV()
    else if (!startDate) {
      this.setState({ startDateIsError: true })
      snackbarMessage({ message: 'Choose start date!' })
    } else {
      this.setState({ endDateIsError: true })
      snackbarMessage({ message: 'Choose end date!' })
    }
  }

  _handleAddTag() {
    const { queryTag, tags, addTag } = this.props
    if (queryTag) {
      if (R.findIndex(R.propEq('label', R.toLower(queryTag)), tags) < 0) {
        addTag()
      } else {
        snackbarMessage({ message: 'repetitive tag!' })
      }
    } else {
      snackbarMessage({ message: 'select or write tag first!' })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Pickers {...this.props} {...this.state} />
        <TagPanel {...this.props} handleAddTag={this.handleAddTag} />
        <Buttons onCalculation={this.handleCalculation} onExport={this.handleExport} />
        <CSVDownloader {...this.props} />
      </React.Fragment>
    )
  }
}

Custom.propTypes = {
  queryTag: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  addTag: PropTypes.func.isRequired,
  calculateTotalDuration: PropTypes.func.isRequired,
  convertJSONToCSV: PropTypes.func.isRequired,
}
