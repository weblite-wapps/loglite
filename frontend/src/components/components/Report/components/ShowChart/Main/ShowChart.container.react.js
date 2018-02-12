// modules
import { connect } from 'react-redux'
// components
import ShowChart from './ShowChart.presentational.react'
// views
import { startDateView, endDateView, barChartDataView } from '../../../Main/Report.reducer'
// actions
import { dispatchUpdateChart } from '../../../Main/Report.action'


const mapStateToProps = () => ({
  startDate: startDateView(),
  endDate: endDateView(),
  barChartData: barChartDataView(),
})

const mapDispatchToProps = () => ({ updateChart: dispatchUpdateChart })


export default connect(mapStateToProps, mapDispatchToProps)(ShowChart)
