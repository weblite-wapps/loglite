// modules
import { connect } from 'react-redux'
// components
import TodayWork from './TodayWork.presentational.react'
// actions
import { dispatchCountinueCounting } from '../../Main/Home.action'
import {
  dispatchChangeExpandingId,
  dispatchSetSecondsElapsed,
  dispatchSaveStartTime,
  dispatchSaveEndTime,
  dispatchAddLogToNextDay,
  dispatchChangeRunningId,
} from '../../../../Main/App.action'
// selectors
import { getWorksDuration } from '../../../../../helper/selectors/workDuration.selector'


const mapStateToProps = (state, ownProps) => ({
  isLoading: state.App.isLoading,
  expandingId: state.App.expandingId,
  runningId: state.App.runningId,
  workDuration: getWorksDuration(state)[ownProps.log._id],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeExpandingId: dispatchChangeExpandingId,
  setSecondsElapsed: value => dispatchSetSecondsElapsed(ownProps.log._id, value),
  countinueCounting: dispatchCountinueCounting,
  onStartClick: dispatchSaveStartTime,
  onStopClick: dispatchSaveEndTime,
  addLogToNextDay: (end, date) =>
    dispatchAddLogToNextDay(ownProps.log.title, ownProps.log.tags, end, date),
  changeRunningId: dispatchChangeRunningId,
})


export default connect(mapStateToProps, mapDispatchToProps)(TodayWork)
