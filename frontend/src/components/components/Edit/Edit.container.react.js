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
  dispatchChangeEditTitle,
} from './Edit.action'
import { logView, timesView, titleView } from './Edit.reducer'

const mapStateToProps = () => ({
  log: logView(),
  times: timesView(),
  title: titleView(),
})

const mapDispatchToProps = () => ({
  submit: () =>
    dispatchSubmitEdit({
      times: timesView(),
      log: logView(),
      title: titleView(),
    }),
  onStartTimeChange: ({ target: { value } }, id) =>
    dispatchChangeEditStartTime(value, id),
  onEndTimeChange: ({ target: { value } }, id) =>
    dispatchChangeEditEndTime(value, id),
  close: dispatchCloseEdit,
  onTitleChange: ({ target: { value } }) => dispatchChangeEditTitle(value),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit)
