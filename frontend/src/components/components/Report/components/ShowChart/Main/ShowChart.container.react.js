// modules
import { connect } from 'react-redux'
// components
import ShowChart from './ShowChart.presentational.react'
// actions
import { dispatchUpdateChart } from '../../../Main/Report.action'


const mapStateToProps = state => ({
  startDate: state.Report.startDate,
  endDate: state.Report.endDate,
  barChartData: state.Report.barChartData,
})

const mapDispatchToProps = () => ({ updateChart: dispatchUpdateChart })


export default connect(mapStateToProps, mapDispatchToProps)(ShowChart)
