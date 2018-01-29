// modules
import { connect } from 'react-redux'
// components
import Report from './Report.presentational.react'
// selectors
import {
  getTotalDuration,
  getStaffTotalDuration,
  getPieChartData,
  getStaffPieChartData,
} from './Report.selector'


const mapStateToProps = state => ({
  userId: state.App.user.id,
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


export default connect(mapStateToProps, null)(Report)
