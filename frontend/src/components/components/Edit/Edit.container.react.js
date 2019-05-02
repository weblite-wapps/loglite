// modules
import { connect } from 'react-redux'
// components
import Edit from './Edit.presentational'
// views
// actions
import {
  dispatchSubmitEdit,
  dispatchChangeEditStartTime,
  dispatchChangeEditEndTime,
  dispatchCloseEdit,
} from './Edit.action'
import { logView, timesView } from './Edit.reducer'

const mapStateToProps = () => ({
  log: logView(),
  times: timesView(),
})

const mapDispatchToProps = () => ({
  submit: () => dispatchSubmitEdit({ times: timesView(), log: logView() }),
  onStartTimeChange: ({ target: { value } }, id) =>
    dispatchChangeEditStartTime(value, id),
  onEndTimeChange: ({ target: { value } }, id) =>
    dispatchChangeEditEndTime(value, id),
  close: dispatchCloseEdit,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit)
