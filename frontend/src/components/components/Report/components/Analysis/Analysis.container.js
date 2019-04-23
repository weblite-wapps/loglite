// modules
import { connect } from 'react-redux'
// components
import Leaderbord from './Analysis.presentational'
// views
import { startDateView, endDateView, isErrorView } from '../../Main/Report.reducer'
// actions
import { dispatchChangeStartDate, dispatchChangeEndDate, dispatchUpdateLeaderboard, dispatchHandleUpdateLeaderboard } from '../../Main/Report.action'
// selectors
import { getLeaderboardData } from '../Leaderboard/Leaderboard.selector'


const mapStateToProps = state => ({
  startDate: startDateView(),
  endDate: endDateView(),
  isError: isErrorView(),
  data: getLeaderboardData(state),
})

const mapDispatchToProps = () => ({
  update: dispatchUpdateLeaderboard,
  onStartDateChange: ({ target: { value } }) => dispatchChangeStartDate(value),
  onEndDateChange: ({ target: { value } }) => dispatchChangeEndDate(value),
  handleUpdate: dispatchHandleUpdateLeaderboard,
})


export default connect(mapStateToProps, mapDispatchToProps)(Leaderbord)
