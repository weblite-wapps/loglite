// modules
import { connect } from 'react-redux'
// components
import ShowChart from './ShowChart.presentational'
// views
import {
  startDateView,
  endDateView,
  barChartDataView,
  isErrorView,
} from '../../Main/Report.reducer'
// actions
import {
  dispatchUpdateChart,
  dispatchChangeStartDate,
  dispatchChangeEndDate,
  dispatchHandleUpdateChart,
} from '../../Main/Report.action'

const mapStateToProps = () => ({
  startDate: startDateView(),
  endDate: endDateView(),
  isError: isErrorView(),
  data: barChartDataView(),
})

const mapDispatchToProps = () => ({
  update: dispatchUpdateChart,
  onStartDateChange: ({ target: { value } }) => dispatchChangeStartDate(value),
  onEndDateChange: ({ target: { value } }) => dispatchChangeEndDate(value),
  handleUpdate: dispatchHandleUpdateChart,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowChart)
