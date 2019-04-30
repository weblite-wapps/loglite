// modules
import { connect } from 'react-redux'
// components
import Edit from './Edit.presentational'
// views
// actions
import {
  dispatchUpdateLog,
  dispatchChangeEditStartTime,
  dispatchChangeEditEndTime,
} from './Edit.action'
import { logView } from './Edit.reducer'

const mapStateToProps = () => ({
  log: logView(),
})

const mapDispatchToProps = () => ({
  submit: dispatchUpdateLog,
  onStartTimeChange: ({ target: { value } }, id) =>
    dispatchChangeEditStartTime(value, id),
  onEndTimeChange: ({ target: { value } }, id) =>
    dispatchChangeEditEndTime(value, id),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit)
