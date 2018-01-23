// modules
import { connect } from 'react-redux'
// components
import WorkList from './WorkList.presentational.react'
// actions
import { deleteLog, changePopoverStage } from '../../../../../Main/App.action'


const mapStateToProps = (state, ownProps) => ({
  workDuration: ownProps.getDuration(state)[ownProps.log._id],
  selectedUser: state.Report.selectedUser,
  userId: state.App.user.id,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteLog: () => dispatch(deleteLog(ownProps.log._id)),
  changePopoverStage: value => dispatch(changePopoverStage(ownProps.log._id, value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(WorkList)
