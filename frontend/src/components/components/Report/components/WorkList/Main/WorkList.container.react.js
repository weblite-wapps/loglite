// modules
import { connect } from 'react-redux'
// components
import WorkList from './WorkList.presentational.react'
// views
import { selectedUserView } from '../../../Main/Report.reducer'
import { userIdView, popoverIdView, runningIdView } from '../../../../../Main/App.reducer'
// actions
import { dispatchDeleteLog, dispatchChangePopoverId } from '../../../../../Main/App.action'


const mapStateToProps = (state, ownProps) => ({
  workDuration: ownProps.getDuration(state)[ownProps.log._id],
  selectedUser: selectedUserView(),
  userId: userIdView(),
  popoverId: popoverIdView(),
  runningId: runningIdView(),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteLog: () => dispatchDeleteLog(ownProps.log._id),
  changePopoverId: dispatchChangePopoverId,
})


export default connect(mapStateToProps, mapDispatchToProps)(WorkList)
