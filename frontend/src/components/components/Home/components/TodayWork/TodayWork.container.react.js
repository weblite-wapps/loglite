// modules
import { connect } from 'react-redux'
// components
import TodayWork from './TodayWork.presentational.react'
// actions
import {
  toggleExpanded,
  setSecondsElapsed,
  incrementSecondsElapsed,
  saveStartTime,
  saveEndTime,
  addLogToNextDay,
  changeRunningId,
} from '../../../../Main/App.action'
// selectors
import { getWorksDuration } from '../../../common/Common.selector'
// helpers
import { getLogDuration } from '../../../common/Common.helper'


const mapStateToProps = (state, ownProps) => ({
  runningId: state.App.runningId,
  workDuration: getLogDuration(getWorksDuration(state), ownProps._id),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleExpanded: _id => dispatch(toggleExpanded(_id)),
  setSecondsElapsed: value => dispatch(setSecondsElapsed(ownProps._id, value)),
  incrementSecondsElapsed: () => dispatch(incrementSecondsElapsed(ownProps._id)),
  onStartClick: () => dispatch(saveStartTime(ownProps._id)),
  onStopClick: (_id, end) => dispatch(saveEndTime(_id, end)),
  addLogToNextDay: (end, date) =>
    dispatch(addLogToNextDay(ownProps.log.title, ownProps.log.tags, end, date)),
  changeRunningId: _id => dispatch(changeRunningId(_id)),
})


export default connect(mapStateToProps, mapDispatchToProps)(TodayWork)
