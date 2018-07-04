// modules
import { connect } from 'react-redux'
// components
import Leaderbord from './Leaderboard.presentational'
// actions
import { dispatchUpdateLeaderboard } from '../Report/Main/Report.action'
// selectors
import { getLeaderboardData } from './Leaderboard.selector'


const mapStateToProps = state => ({ leaderboard: getLeaderboardData(state) })

const mapDispatchToProps = () => ({ updateLeaderboard: dispatchUpdateLeaderboard })


export default connect(mapStateToProps, mapDispatchToProps)(Leaderbord)
