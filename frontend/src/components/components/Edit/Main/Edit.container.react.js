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
  dispatchSetTagQueryInEdit,
  dispatchChangeSelectedTagsInEdit,
  dispatchHandleAddTagInEdit,
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
  selectedTagsView,
  queryTagView,
  tagsView,
} from './Edit.reducer'
// selectors
import { getEditFilteredSuggestions } from '../../../Main/App.selector';

const mapStateToProps = (state) => ({
  log: logView(),
  times: timesView(),
  title: titleView(),
  isError: isErrorView(),
  anchorEl: anchorElView(),
  popoverId: popoverIdView(),
  isOpen: isOpenDialogView(),
  selectedTags: selectedTagsView(),
  queryTag: queryTagView(),
  suggestions: getEditFilteredSuggestions(state),
  tags: tagsView(),
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
  onQueryTagChange: dispatchSetTagQueryInEdit,
  onTagClick: dispatchChangeSelectedTagsInEdit,
  handleAddTag: dispatchHandleAddTagInEdit,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit)
