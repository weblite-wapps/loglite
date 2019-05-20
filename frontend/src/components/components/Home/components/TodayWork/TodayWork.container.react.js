// modules
import { connect } from 'react-redux'
// components
import TodayWork from './TodayWork.presentational'
// views
import { isLoadingView } from '../../../../Main/App.reducer'
import { secondsElapsedView, runningIdView } from '../../Main/Home.reducer'
// actions
import {
  dispatchCountinueCounting,
  dispatchSetSecondsElapsed,
  dispatchChangeRunningId,
} from '../../Main/Home.action'
import {
  dispatchHandleSaveStartTime,
  dispatchHandleSaveEndTime,
  dispatchAddLogToNextDay,
  dispatchHandleToggleIsPinned,
} from '../../../../Main/App.action'
// selectors
import { getWorksDuration } from '../../../../../helper/selectors/workDuration.selector'

const mapStateToProps = (state, { log: { _id } }) => ({
  isLoading: isLoadingView(),
  runningId: runningIdView(),
  secondsElapsed: secondsElapsedView(),
  workDuration: getWorksDuration(state)[_id],
})

const mapDispatchToProps = (_, { log: { title, tags, isPinned } }) => ({
  setSecondsElapsed: dispatchSetSecondsElapsed,
  countinueCounting: dispatchCountinueCounting,
  onStartClick: dispatchHandleSaveStartTime,
  onStopClick: dispatchHandleSaveEndTime,
  onToggleIsPinned: dispatchHandleToggleIsPinned,
  addLogToNextDay: (end, date) =>
    dispatchAddLogToNextDay(title, tags, isPinned, end, date),
  changeRunningId: dispatchChangeRunningId,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodayWork)
