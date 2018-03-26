// modules
import { connect } from 'react-redux'
// components
import Home from './Home.presentational.react'
// views
import { logsView } from '../../../Main/App.reducer'
// actions
import { dispatchChangeTab } from '../../../Main/App.action'


const mapStateToProps = () => ({ logs: logsView() })

const mapDispatchToProps = () => ({ changeTab: dispatchChangeTab })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
