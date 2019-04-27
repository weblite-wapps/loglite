// modules
import { connect } from 'react-redux'
// components
import Edit from './Edit.presentational'
// views
// actions
import { dispatchUpdateLog } from './Edit.action'
import { logView } from './Edit.reducer'

const mapStateToProps = () => ({
  log: logView(),
})

const mapDispatchToProps = () => ({
  submit: dispatchUpdateLog,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit)
