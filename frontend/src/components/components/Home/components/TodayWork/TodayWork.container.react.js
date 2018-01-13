// modules
import { connect } from 'react-redux'
// components
import TodayWork from './TodayWork.presentational.react'
// actions
import {
  toggleExpanded,
  saveStartTime,
  saveEndTime,
  addLogToNextDay,
  toggleIsRunning,
} from '../../../../Main/App.action'
import { changeSnackbarStage } from '../../../Snackbar/Snackbar.action'
// selectors
import { getWorksDuration } from '../../../common/Common.selector'
// helpers
import { getLogDuration } from '../../../common/Common.helper'


const mapStateToProps = (state, ownProps) => ({
  isRunning: state.App.isRunning,
  workDuration: getLogDuration(getWorksDuration(state), ownProps.log._id),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleExpanded: () => dispatch(toggleExpanded(ownProps.log._id)),
  onStartClick: () => dispatch(saveStartTime(ownProps.log._id)),
  onStopClick: end => dispatch(saveEndTime(ownProps.log._id, end)),
  addLogToNextDay: (end, date) =>
    dispatch(addLogToNextDay(ownProps.log.title, ownProps.log.tags, end, date)),
  toggleIsRunning: () => dispatch(toggleIsRunning()),
  changeSnackbarStage: (value, message) => dispatch(changeSnackbarStage(value, message)),
})


export default connect(mapStateToProps, mapDispatchToProps)(TodayWork)
