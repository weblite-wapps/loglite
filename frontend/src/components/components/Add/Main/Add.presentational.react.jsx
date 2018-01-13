// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import isAfter from 'date-fns/is_after'
import format from 'date-fns/format'
// components
import TextField from '../../common/TextField/TextField.presentational.react'
import Autocomplete from '../../common/Autocomplete/Autocomplete.presentational.react'
import TagList from '../../common/TagList/TagList.presentational.react'
import Button from '../../common/Button/Button.presentational.react'
import Custom from '../components/Custom/Main/Custom.presentational.react'
// helpers
import { formatTime, areTimesOverlapping } from './Add.helper'
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
    const { inputName, selectedTags, addLog, changeTab, history, changeSnackbarStage } = this.props
    if (inputName) {
      addLog(inputName, selectedTags)
      changeSnackbarStage(true, 'Added successfully!')
      changeTab('Home')
      history.push('/')
    } else {
      this.setState({ nameIsError: true })
      changeSnackbarStage(true, 'Enter name first!')
    }
  }

  _handleAddCustomLog() {
    const {
      logs,
      date,
      startTime,
      endTime,
      inputName,
      selectedTags,
      addCustomLog,
      history,
      changeSnackbarStage,
      changeTab } = this.props
    if (inputName && date && startTime && endTime) {
      if (isAfter(new Date(date), new Date())) {
        this.setState({ dateIsError: true })
        changeSnackbarStage(true, 'Are you predictor?!')
      } else if (date === format(new Date(), 'YYYY-MM-DD') && isAfter(formatTime(startTime), new Date())) {
        this.setState({ startTimeIsError: true })
        changeSnackbarStage(true, 'Are you predictor?!')
      } else if (date === format(new Date(), 'YYYY-MM-DD') && isAfter(formatTime(endTime), new Date())) {
        this.setState({ endTimeIsError: true })
        changeSnackbarStage(true, 'Are you predictor?!')
      } else if (isAfter(formatTime(endTime), formatTime(startTime))) {
        if (areTimesOverlapping(
          R.filter(eachLog => (eachLog.date === date), logs),
          formatTime(startTime), formatTime(endTime))) {
          changeSnackbarStage(true, 'Time is overlapping!')
        } else {
          addCustomLog(inputName, selectedTags, date, startTime, endTime)
          changeSnackbarStage(true, 'Added successfully!')
          changeTab('Home')
          history.push('/')
        }
      } else {
        this.setState({ startTimeIsError: true })
        this.setState({ endTimeIsError: true })
        changeSnackbarStage(true, 'StartTime is after EndTime!')
      }
    } else if (!inputName) {
      this.setState({ nameIsError: true })
      changeSnackbarStage(true, 'Please enter name!')
    } else if (!date) {
      this.setState({ dateIsError: true })
      changeSnackbarStage(true, 'Please enter date!')
    } else if (!startTime) {
      this.setState({ startTimeIsError: true })
      changeSnackbarStage(true, 'Please enter start time!')
    } else {
      this.setState({ endTimeIsError: true })
      changeSnackbarStage(true, 'Please enter end time!')
    }
  }

  _handleAddTag() {
    const { queryTag, tags, addTag, changeSnackbarStage } = this.props
    if (queryTag) {
      if (R.findIndex(R.propEq('label', R.toLower(queryTag)), tags) < 0) {
        addTag()
      } else {
        changeSnackbarStage(true, 'repetitive tag!')
      }
    } else {
      changeSnackbarStage(true, 'select or input tag first!')
    }
  }

  render() {
    const { dateIsError, startTimeIsError, endTimeIsError } = this.state
    const {
      inputName,
      onInputNameChange,
      suggestions,
      queryTag,
      onQueryTagChange,
      tags,
      onTagClick,
    } = this.props
    return (
      <div className={scssClasses.container}>
        <div className={scssClasses.textField}>
          <TextField
            label="Task Name"
            value={inputName}
            onChange={e => onInputNameChange(e.target.value)}
            isError={this.state.nameIsError}
          />
        </div>
        <div className={scssClasses.textField}>
          <Autocomplete
            label="Tags"
            suggestions={suggestions}
            inputValue={queryTag}
            onInputValueChange={e => onQueryTagChange(e.target.value)}
            onSelect={value => onQueryTagChange(value)}
            onAdd={this.handleAddTag}
          />
          <Button label="Add" onClick={this.handleAddTag} />
        </div>
        <TagList tags={tags} onTagClick={tag => onTagClick(tag)} />
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  inputName: PropTypes.string.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryTag: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  onInputNameChange: PropTypes.func.isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  addLog: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired,
  addCustomLog: PropTypes.func.isRequired,
  changeSnackbarStage: PropTypes.func.isRequired,
}

export default withRouter(Add)
