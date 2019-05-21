// modules
import { connect } from 'react-redux'
// components
import Home from './Home.presentational'
// views
import { logsView } from '../../../Main/App.reducer'
// actions
import { dispatchHandleAddLog } from '../../Add/Main/Add.action'

const mapStateToProps = () => ({ logs: logsView() })

const mapDispatchToProps = () => ({ onAdd: dispatchHandleAddLog })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
