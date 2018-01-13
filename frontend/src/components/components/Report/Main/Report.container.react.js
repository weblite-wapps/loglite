// modules
import { connect } from 'react-redux'
// components
import Report from './Report.presentational.react'
// actions
import { decrementCurrentPage, incrementCurrentPage } from './Report.action'
// selectors
import { getTotalDuration, getPieChartData } from './Report.selector'


const mapStateToProps = state => ({
  logs: state.App.logs,
  currentPage: state.Report.currentPage,
  totalDuration: getTotalDuration(state),
  totalDurationFromServer: state.Report.totalDuration,
  pieChartData: getPieChartData(state),
})

const mapDispatchToProps = dispatch => ({
  onPreviousClick: () => dispatch(decrementCurrentPage()),
  onNextClick: () => dispatch(incrementCurrentPage()),
})


export default connect(mapStateToProps, mapDispatchToProps)(Report)
