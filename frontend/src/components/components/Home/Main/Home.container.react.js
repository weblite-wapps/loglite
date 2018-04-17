// modules
import { connect } from 'react-redux'
// components
import Home from './Home.presentational'
// views
import { logsView, blurView } from '../../../Main/App.reducer'
// actions
import { dispatchChangeTab } from '../../../Main/App.action'


const mapStateToProps = () => ({
  logs: logsView(),
  blur: blurView(),
})

const mapDispatchToProps = () => ({ changeTab: dispatchChangeTab })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
