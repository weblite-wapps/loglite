// modules
import { connect } from 'react-redux'
// components
import TodayWork from './TodayWork.presentational.react'
// actions
import { countinueCounting } from '../../Main/Home.action'
import {
  toggleExpanded,
  setSecondsElapsed,
  saveStartTime,
  saveEndTime,
  addLogToNextDay,
  changeRunningId,
} from '../../../../Main/App.action'
// selectors
import { getWorksDuration } from '../../../common/Common.selector'


const mapStateToProps = (state, ownProps) => ({
  runningId: state.App.runningId,
  workDuration: getWorksDuration(state)[ownProps.log._id],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleExpanded: _id => dispatch(toggleExpanded(_id)),
  setSecondsElapsed: value => dispatch(setSecondsElapsed(ownProps.log._id, value)),
  countinueCounting: _id => dispatch(countinueCounting(_id)),
  onStartClick: () => dispatch(saveStartTime(ownProps.log._id)),
  onStopClick: (_id, end) => dispatch(saveEndTime(_id, end)),
  addLogToNextDay: (end, date) =>
    dispatch(addLogToNextDay(ownProps.log.title, ownProps.log.tags, end, date)),
  changeRunningId: _id => dispatch(changeRunningId(_id)),
})


export default connect(mapStateToProps, mapDispatchToProps)(TodayWork)
