// modules
import { connect } from 'react-redux'
// components
import Report from './Report.presentational'
// actions
import { dispatchChangeExpandMode } from './Report.action'
// views
import { userIdView, logsView } from '../../../Main/App.reducer'
import { expandModeView, selectedUserView, staffLogsView, currentPageView, totalDurationView } from './Report.reducer'
// selectors
import {
  getTotalDuration,
  getStaffTotalDuration,
  getPieChartData,
  getStaffPieChartData,
} from './Report.selector'


const mapStateToProps = state => ({
  expandMode: expandModeView(),
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

const mapDispatchToProps = () => ({ changeExpandMode: dispatchChangeExpandMode })


export default connect(mapStateToProps, mapDispatchToProps)(Report)
