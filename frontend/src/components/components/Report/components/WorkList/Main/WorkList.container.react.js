// modules
import { connect } from 'react-redux'
// components
import WorkList from './WorkList.presentational'
// views
import { selectedUserView, anchorElView } from '../../../Main/Report.reducer'
import {
  userIdView,
  popoverIdView,
  isLoadingView,
} from '../../../../../Main/App.reducer'
import {
  secondsElapsedView,
  runningIdView,
} from '../../../../Home/Main/Home.reducer'
// actions
import {
  dispatchHandleDeleteLog,
  dispatchChangePopoverId,
  dispatchHandleToggleIsPinned,
} from '../../../../../Main/App.action'
import {
  dispatchChangeAnchorEl,
  dispatchEditClick,
} from '../../../Main/Report.action'
import {
  dispatchSetSecondsElapsed,
  dispatchCountinueCounting,
} from '../../../../Home/Main/Home.action'

const mapStateToProps = (state, { getDuration, log: { _id } }) => ({
  workDuration: getDuration(state)[_id],
  selectedUser: selectedUserView(),
  userId: userIdView(),
  popoverId: popoverIdView(),
  runningId: runningIdView(),
  anchorEl: anchorElView(),
  secondsElapsed: secondsElapsedView(),
  isLoading: isLoadingView(),
})

const mapDispatchToProps = (_, { log: { _id } }) => ({
  handleDeleteLog: _id => dispatchHandleDeleteLog(_id),
  changePopoverId: dispatchChangePopoverId,
  changeAnchorEl: dispatchChangeAnchorEl,
  setSecondsElapsed: dispatchSetSecondsElapsed,
  countinueCounting: dispatchCountinueCounting,
  editClick: dispatchEditClick,
  onToggleIsPinned: dispatchHandleToggleIsPinned,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkList)
