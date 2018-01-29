// modules
import { connect } from 'react-redux'
// components
import Report from './Report.presentational.react'
// actions
import { changeSelectedUser } from './Report.action'
// selectors
import {
  getTotalDuration,
  getStaffTotalDuration,
  getPieChartData,
  getStaffPieChartData,
} from './Report.selector'


const mapStateToProps = state => ({
  userId: state.App.user.id,
  creator: state.App.creator,
  users: state.App.users,
  selectedUser: state.Report.selectedUser,
  logs: state.App.logs,
  staffLogs: state.Report.staffLogs,
  currentPage: state.Report.currentPage,
  totalDuration: getTotalDuration(state),
  staffTotalDuration: getStaffTotalDuration(state),
  totalDurationFromServer: state.Report.totalDuration,
  pieChartData: getPieChartData(state),
  staffPieChartData: getStaffPieChartData(state),
})

const mapDispatchToProps = dispatch => ({
  changeSelectedUser: user => dispatch(changeSelectedUser(user)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Report)
