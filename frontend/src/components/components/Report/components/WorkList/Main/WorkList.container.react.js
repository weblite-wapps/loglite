// modules
import { connect } from 'react-redux'
// components
import WorkList from './WorkList.presentational'
// views
import {
  selectedUserView,
  anchorElView,
  editModeView,
} from '../../../Main/Report.reducer'
import { userIdView, popoverIdView } from '../../../../../Main/App.reducer'
import {
  secondsElapsedView,
  runningIdView,
} from '../../../../Home/Main/Home.reducer'
// actions
import {
  dispatchHandleDeleteLog,
  dispatchChangePopoverId,
} from '../../../../../Main/App.action'
import {
  dispatchChangeAnchorEl,
  dispatchChangeEditMode,
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
  editMode: editModeView(),
})

const mapDispatchToProps = (dispatch, { log: { _id } }) => ({
  handleDeleteLog: () => dispatchHandleDeleteLog(_id),
  changePopoverId: dispatchChangePopoverId,
  changeAnchorEl: dispatchChangeAnchorEl,
  setSecondsElapsed: dispatchSetSecondsElapsed,
  countinueCounting: dispatchCountinueCounting,
  editClick: () => dispatchChangeEditMode(true),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkList)
