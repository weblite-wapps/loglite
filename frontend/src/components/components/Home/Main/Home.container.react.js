// modules
import { connect } from 'react-redux'
// components
import Home from './Home.presentational'
// views
import { logsView } from '../../../Main/App.reducer'
// actions
import { dispatchSetAboutMode } from '../../../Main/App.action'


const mapStateToProps = () => ({ logs: logsView() })

const mapDispatchToProps = () => ({ setAboutMode: dispatchSetAboutMode })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
