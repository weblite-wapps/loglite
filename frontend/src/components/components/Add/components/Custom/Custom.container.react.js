// modules
import { connect } from 'react-redux'
// components
import Custom from './Custom.presentational'
// views
import { isLoadingView } from '../../../../Main/App.reducer'
import { expandedView, startTimeView, endTimeView, dateView } from '../../Main/Add.reducer'
// actions
import {
  dispatchToggleExpanded,
  dispatchChangeStartTime,
  dispatchChangeEndTime,
  dispatchChangeDate,
} from '../../Main/Add.action'


const mapStateToProps = () => ({
  isLoading: isLoadingView(),
  expanded: expandedView(),
  startTime: startTimeView(),
  endTime: endTimeView(),
  date: dateView(),
})

const mapDispatchToProps = () => ({
  onExpand: dispatchToggleExpanded,
  onStartTimeChange: ({ target: { value } }) => dispatchChangeStartTime(value),
  onEndTimeChange: ({ target: { value } }) => dispatchChangeEndTime(value),
  onDateChange: ({ target: { value } }) => dispatchChangeDate(value),
})


export default connect(mapStateToProps, mapDispatchToProps)(Custom)
