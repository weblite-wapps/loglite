// modules
import { connect } from 'react-redux'
// components
import Add from './Add.presentational'
// views
import { logsView } from '../../../Main/App.reducer'
import { titleView, selectedTagsView, queryTagView, tagsView, dateView, startTimeView, endTimeView, isErrorView } from './Add.reducer'
// actions
import { dispatchChangeTab } from '../../../Main/App.action'
import {
  dispatchChangeTitle,
  dispatchSetQueryInAdd,
  dispatchChangeSelectedTagsInAdd,
  dispatchChangeIsError,
  dispatchHandleAddTag,
  dispatchHandleAddLog,
  dispatchHandleAddCustomLog,
} from './Add.action'
// selectors
import { getAddFilteredSuggestions } from '../../../Main/App.selector'


const mapStateToProps = state => ({
  logs: logsView(),
  title: titleView(),
  selectedTags: selectedTagsView(),
  queryTag: queryTagView(),
  suggestions: getAddFilteredSuggestions(state),
  tags: tagsView(),
  date: dateView(),
  startTime: startTimeView(),
  endTime: endTimeView(),
  isError: isErrorView(),
})

const mapDispatchToProps = () => ({
  onTitleChange: dispatchChangeTitle,
  onQueryTagChange: dispatchSetQueryInAdd,
  onTagClick: dispatchChangeSelectedTagsInAdd,
  changeTab: dispatchChangeTab,
  changeIsError: dispatchChangeIsError,
  handleAddTag: dispatchHandleAddTag,
  onAdd: dispatchHandleAddLog,
  onCustomAdd: dispatchHandleAddCustomLog,
})


export default connect(mapStateToProps, mapDispatchToProps)(Add)
