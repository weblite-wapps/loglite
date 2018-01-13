// modules
import { connect } from 'react-redux'
// components
import ShowChart from './ShowChart.presentational.react'
// actions
import { updateChart } from '../../../Main/Report.action'


const mapStateToProps = state => ({
  startDate: state.Report.startDate,
  endDate: state.Report.endDate,
  barChartData: state.Report.barChartData,
})

const mapDispatchToProps = dispatch => ({
  updateChart: (startDate, endDate) => dispatch(updateChart(startDate, endDate)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ShowChart)
