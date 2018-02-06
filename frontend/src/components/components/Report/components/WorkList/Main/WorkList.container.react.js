// modules
import { connect } from 'react-redux'
// components
import WorkList from './WorkList.presentational.react'
// actions
import { dispatchDeleteLog, dispatchChangePopoverId } from '../../../../../Main/App.action'


const mapStateToProps = (state, ownProps) => ({
  workDuration: ownProps.getDuration(state)[ownProps.log._id],
  selectedUser: state.Report.selectedUser,
  userId: state.App.user.id,
  popoverId: state.App.popoverId,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteLog: () => dispatchDeleteLog(ownProps.log._id),
  changePopoverId: dispatchChangePopoverId,
})


export default connect(mapStateToProps, mapDispatchToProps)(WorkList)
