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
  dispatchChangeEditPopOverId,
  dispatchChangeEditAnchorEl,
} from './Edit.action'
// views
import {
  logView,
  timesView,
  titleView,
  isErrorView,
  anchorElView,
  popoverIdView,
  isOpenDialogView,
} from './Edit.reducer'
import { isLoadingView } from '../../../Main/App.reducer'
const mapStateToProps = () => ({
  log: logView(),
  times: timesView(),
  title: titleView(),
  isError: isErrorView(),
  anchorEl: anchorElView(),
  isOpen: isOpenDialogView(),
  popoverId: popoverIdView(),
  isLoading: isLoadingView(),
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
  changePopoverId: dispatchChangeEditPopOverId,
  changeAnchorEl: dispatchChangeEditAnchorEl,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit)
