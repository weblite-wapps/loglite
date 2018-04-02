// modules
import { connect } from 'react-redux'
// components
import ShowChart from './ShowChart.presentational'
// views
import { startDateView, endDateView, barChartDataView } from '../../../Main/Report.reducer'
// actions
import { dispatchUpdateChart, dispatchChangeStartDate, dispatchChangeEndDate } from '../../../Main/Report.action'


const mapStateToProps = () => ({
  startDate: startDateView(),
  endDate: endDateView(),
  barChartData: barChartDataView(),
})

const mapDispatchToProps = () => ({
  updateChart: dispatchUpdateChart,
  onStartDateChange: ({ target: { value } }) => dispatchChangeStartDate(value),
  onEndDateChange: ({ target: { value } }) => dispatchChangeEndDate(value),
})


export default connect(mapStateToProps, mapDispatchToProps)(ShowChart)
