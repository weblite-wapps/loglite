// modules
import { connect } from 'react-redux'
// components
import Add from './Add.presentational.react'
// views
import { logsView } from '../../../Main/App.reducer'
import { titleView, selectedTagsView, queryTagView, tagsView, dateView, startTimeView, endTimeView } from './Add.reducer'
// actions
import { dispatchChangeTab, dispatchAddLog, dispatchAddCustomLog } from '../../../Main/App.action'
import {
  dispatchChangeTitle,
  dispatchSetQueryInAdd,
  dispatchChangeSelectedTagsInAdd,
  dispatchAddTagInAdd,
} from './Add.action'
// selector
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
})

const mapDispatchToProps = () => ({
  onTitleChange: dispatchChangeTitle,
  onQueryTagChange: dispatchSetQueryInAdd,
  onTagClick: dispatchChangeSelectedTagsInAdd,
  addTag: dispatchAddTagInAdd,
  addLog: dispatchAddLog,
  changeTab: dispatchChangeTab,
  addCustomLog: dispatchAddCustomLog,
})


export default connect(mapStateToProps, mapDispatchToProps)(Add)
