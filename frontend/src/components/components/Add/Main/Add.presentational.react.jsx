// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import isAfter from 'date-fns/is_after'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import Custom from '../components/Custom/Custom.container.react'
// helpers
import { TagPanel } from '../../../../helper/functions/common.helper.component'
import { TextField } from './Add.helper.component'
import { areTimesOverlapping } from './Add.helper'
import { formatTime } from '../../../../helper/functions/time.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
// scssClasses
import scssClasses from './Add.scss'


class Add extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddLog = this._handleAddLog.bind(this)
    this.handleAddCustomLog = this._handleAddCustomLog.bind(this)
    this.handleAddTag = this._handleAddTag.bind(this)
    this.state = {
      nameIsError: false,
      dateIsError: false,
      startTimeIsError: false,
      endTimeIsError: false,
    }
  }

  _handleAddLog() {
    const { title, selectedTags, addLog, changeTab } = this.props
    if (title) {
      addLog(title, selectedTags)
      snackbarMessage({ message: 'Added successfully!' })
      changeTab('Home')
    } else {
      this.setState({ nameIsError: true })
      snackbarMessage({ message: 'Enter name first!' })
    }
  }

  _handleAddCustomLog() {
    const { logs, date, startTime, endTime, title,
      selectedTags, addCustomLog, changeTab } = this.props
    if (title && date && startTime && endTime) {
      if (isAfter(new Date(date), new Date())) {
        this.setState({ dateIsError: true })
        snackbarMessage({ message: 'Are you predictor?!' })
      } else if (date === formattedDate(new Date()) && isAfter(formatTime(startTime), new Date())) {
        this.setState({ startTimeIsError: true })
        snackbarMessage({ message: 'Are you predictor?!' })
      } else if (date === formattedDate(new Date()) && isAfter(formatTime(endTime), new Date())) {
        this.setState({ endTimeIsError: true })
        snackbarMessage({ message: 'Are you predictor?!' })
      } else if (isAfter(formatTime(endTime), formatTime(startTime))) {
        if (areTimesOverlapping(
          R.filter(eachLog => (eachLog.date === date), logs),
          formatTime(startTime), formatTime(endTime))) {
          snackbarMessage({ message: 'Time is overlapping!' })
        } else {
          addCustomLog(title, selectedTags, date, startTime, endTime)
          snackbarMessage({ message: 'Added successfully!' })
          changeTab('Home')
        }
      } else {
        this.setState({ startTimeIsError: true })
        this.setState({ endTimeIsError: true })
        snackbarMessage({ message: 'StartTime is after EndTime!' })
      }
    } else if (!title) {
      this.setState({ nameIsError: true })
      snackbarMessage({ message: 'Please enter name!' })
    } else if (!date) {
      this.setState({ dateIsError: true })
      snackbarMessage({ message: 'Please enter date!' })
    } else if (!startTime) {
      this.setState({ startTimeIsError: true })
      snackbarMessage({ message: 'Please enter start time!' })
    } else {
      this.setState({ endTimeIsError: true })
      snackbarMessage({ message: 'Please enter end time!' })
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
    const { nameIsError, dateIsError, startTimeIsError, endTimeIsError } = this.state

    return (
      <div className={scssClasses.container}>
        <TextField {...this.props} isError={nameIsError} />
        <TagPanel {...this.props} handleAddTag={this.handleAddTag} />
        <Custom
          onAdd={this.handleAddLog}
          onCustomAdd={this.handleAddCustomLog}
          dateIsError={dateIsError}
          startTimeIsError={startTimeIsError}
          endTimeIsError={endTimeIsError}
        />
      </div>
    )
  }
}

Add.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryTag: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  addLog: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired,
  addCustomLog: PropTypes.func.isRequired,
}

export default Add
