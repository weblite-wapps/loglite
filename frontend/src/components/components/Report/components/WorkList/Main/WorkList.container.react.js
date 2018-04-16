// modules
import { connect } from 'react-redux'
// components
import WorkList from './WorkList.presentational'
// views
import { selectedUserView, anchorElView } from '../../../Main/Report.reducer'
import { userIdView, popoverIdView } from '../../../../../Main/App.reducer'
import { secondsElapsedView, runningIdView } from '../../../../Home/Main/Home.reducer'
// actions
import { dispatchDeleteLog, dispatchChangePopoverId } from '../../../../../Main/App.action'
import { dispatchChangeAnchorEl } from '../../../Main/Report.action'
import { dispatchSetSecondsElapsed, dispatchCountinueCounting } from '../../../../Home/Main/Home.action'

const mapStateToProps = (state, ownProps) => ({
  workDuration: ownProps.getDuration(state)[ownProps.log._id],
  selectedUser: selectedUserView(),
  userId: userIdView(),
  popoverId: popoverIdView(),
  runningId: runningIdView(),
  anchorEl: anchorElView(),
  secondsElapsed: secondsElapsedView(),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteLog: () => dispatchDeleteLog(ownProps.log._id),
  changePopoverId: dispatchChangePopoverId,
  changeAnchorEl: dispatchChangeAnchorEl,
  setSecondsElapsed: dispatchSetSecondsElapsed,
  countinueCounting: dispatchCountinueCounting,
})


export default connect(mapStateToProps, mapDispatchToProps)(WorkList)
