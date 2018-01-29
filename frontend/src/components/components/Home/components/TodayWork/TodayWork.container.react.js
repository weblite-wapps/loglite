// modules
import { connect } from 'react-redux'
// components
import TodayWork from './TodayWork.presentational.react'
// actions
import { dispatchCountinueCounting } from '../../Main/Home.action'
import {
  dispatchToggleExpanded,
  dispatchSetSecondsElapsed,
  dispatchSaveStartTime,
  dispatchSaveEndTime,
  dispatchAddLogToNextDay,
  dispatchChangeRunningId,
} from '../../../../Main/App.action'
// selectors
import { getWorksDuration } from '../../../../../helper/selectors/workDuration.selector'


const mapStateToProps = (state, ownProps) => ({
  runningId: state.App.runningId,
  workDuration: getWorksDuration(state)[ownProps.log._id],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleExpanded: dispatchToggleExpanded,
  setSecondsElapsed: value => dispatchSetSecondsElapsed(ownProps.log._id, value),
  countinueCounting: dispatchCountinueCounting,
  onStartClick: () => dispatchSaveStartTime(ownProps.log._id),
  onStopClick: dispatchSaveEndTime,
  addLogToNextDay: (end, date) =>
    dispatchAddLogToNextDay(ownProps.log.title, ownProps.log.tags, end, date),
  changeRunningId: dispatchChangeRunningId,
})


export default connect(mapStateToProps, mapDispatchToProps)(TodayWork)
