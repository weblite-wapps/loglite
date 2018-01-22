// modules
import { connect } from 'react-redux'
// components
import Report from './Report.presentational.react'
// actions
import { changeSelectedUser, decrementCurrentPage, incrementCurrentPage } from './Report.action'
// selectors
import { getTotalDuration, getPieChartData } from './Report.selector'


const mapStateToProps = state => ({
  userId: state.App.userId,
  sender: state.App.sender,
  users: state.App.users,
  selectedUser: state.Report.selectedUser,
  logs: state.App.logs,
  currentPage: state.Report.currentPage,
  totalDuration: getTotalDuration(state),
  totalDurationFromServer: state.Report.totalDuration,
  pieChartData: getPieChartData(state),
})

const mapDispatchToProps = dispatch => ({
  changeSelectedUser: user => dispatch(changeSelectedUser(user)),
  onPreviousClick: () => dispatch(decrementCurrentPage()),
  onNextClick: () => dispatch(incrementCurrentPage()),
})


export default connect(mapStateToProps, mapDispatchToProps)(Report)
