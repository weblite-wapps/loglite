// modules
import { connect } from 'react-redux'
// components
import TodayWork from './TodayWork.presentational'
// views
import { isLoadingView } from '../../../../Main/App.reducer'
import { secondsElapsedView, runningIdView } from '../../Main/Home.reducer'
// actions
import { dispatchCountinueCounting, dispatchSetSecondsElapsed, dispatchChangeRunningId } from '../../Main/Home.action'
import { dispatchSaveStartTime, dispatchSaveEndTime, dispatchAddLogToNextDay } from '../../../../Main/App.action'
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
