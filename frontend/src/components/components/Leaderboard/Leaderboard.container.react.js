// modules
import { connect } from 'react-redux'
// components
import Leaderbord from './Leaderboard.presentational'
// views
// import { aboutModeView } from './App.reducer'
import { leaderboardView } from '../Report/Main/Report.reducer'
// actions
import { dispatchUpdateLeaderboard } from '../Report/Main/Report.action'


const mapStateToProps = () => ({
  leaderboard: leaderboardView(),
  // aboutMode: aboutModeView(),
})

const mapDispatchToProps = () => ({
  updateLeaderboard: dispatchUpdateLeaderboard,
})


export default connect(mapStateToProps, mapDispatchToProps)(Leaderbord)
