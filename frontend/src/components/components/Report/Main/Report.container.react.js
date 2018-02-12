// modules
import { connect } from 'react-redux'
// components
import Report from './Report.presentational.react'
// views
import { userIdView, logsView } from '../../../Main/App.reducer'
import { selectedUserView, staffLogsView, currentPageView, totalDurationView } from './Report.reducer'
// selectors
import {
  getTotalDuration,
  getStaffTotalDuration,
  getPieChartData,
  getStaffPieChartData,
} from './Report.selector'


const mapStateToProps = state => ({
  userId: userIdView(),
  selectedUser: selectedUserView(),
  logs: logsView(),
  staffLogs: staffLogsView(),
  currentPage: currentPageView(),
  totalDuration: getTotalDuration(state),
  staffTotalDuration: getStaffTotalDuration(state),
  totalDurationFromServer: totalDurationView(),
  pieChartData: getPieChartData(state),
  staffPieChartData: getStaffPieChartData(state),
})


export default connect(mapStateToProps, null)(Report)
