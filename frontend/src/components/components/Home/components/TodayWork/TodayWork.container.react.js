// modules
import { connect } from 'react-redux'
// components
import TodayWork from './TodayWork.presentational.react'
// views
import { isLoadingView, runningIdView, secondsElapsedView } from '../../../../Main/App.reducer'
// actions
import { dispatchCountinueCounting } from '../../Main/Home.action'
import {
  dispatchSetSecondsElapsed,
  dispatchSaveStartTime,
  dispatchSaveEndTime,
  dispatchAddLogToNextDay,
  dispatchChangeRunningId,
} from '../../../../Main/App.action'
// selectors
import { getWorksDuration } from '../../../../../helper/selectors/workDuration.selector'


const mapStateToProps = (state, { log: { _id } }) => ({
  isLoading: isLoadingView(),
  runningId: runningIdView(),
  secondsElapsed: secondsElapsedView(),
  workDuration: getWorksDuration(state)[_id],
})

const mapDispatchToProps = (dispatch, { log: { title, tags } }) => ({
  setSecondsElapsed: dispatchSetSecondsElapsed,
  countinueCounting: dispatchCountinueCounting,
  onStartClick: dispatchSaveStartTime,
  onStopClick: dispatchSaveEndTime,
  addLogToNextDay: (end, date) => dispatchAddLogToNextDay(title, tags, end, date),
  changeRunningId: dispatchChangeRunningId,
})


export default connect(mapStateToProps, mapDispatchToProps)(TodayWork)
