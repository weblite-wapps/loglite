// modules
import { connect } from 'react-redux'
// components
import Edit from './Edit.presentational'
// actions
import {
  dispatchSubmitEdit,
  dispatchChangeEditStartTime,
  dispatchChangeEditEndTime,
  dispatchCloseEdit,
  dispatchChangeEditTitle,
  dispatchRemoveInterval,
} from './Edit.action'
// views
import {
  logView,
  timesView,
  titleView,
  isErrorView,
  anchorElView,
  popoverIdView,
} from './Edit.reducer'
import { dispatchChangePopoverId, dispatchChangeAnchorEl } from './Edit.action'

const mapStateToProps = () => ({
  log: logView(),
  times: timesView(),
  title: titleView(),
  isError: isErrorView(),
  anchorEl: anchorElView(),
  popoverId: popoverIdView(),
})

const mapDispatchToProps = () => ({
  submit: () =>
    dispatchSubmitEdit({
      times: timesView(),
      log: logView(),
      title: titleView(),
    }),
  onStartTimeChange: ({ target: { value } }, id) =>
    dispatchChangeEditStartTime({ value, id }),
  onEndTimeChange: ({ target: { value } }, id) =>
    dispatchChangeEditEndTime({ value, id }),
  close: dispatchCloseEdit,
  onTitleChange: ({ target: { value } }) => dispatchChangeEditTitle(value),
  removeInterval: dispatchRemoveInterval,
  changePopoverId: dispatchChangePopoverId,
  changeAnchorEl: dispatchChangeAnchorEl,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit)
