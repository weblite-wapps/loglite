// modules
import { connect } from 'react-redux'
// components
import Home from './Home.presentational.react'
// actions
import { dispatchChangeTab } from '../../../Main/App.action'


const mapStateToProps = state => ({
  logs: state.App.logs,
  runningId: state.App.runningId,
})

const mapDispatchToProps = () => ({ changeTab: dispatchChangeTab })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
