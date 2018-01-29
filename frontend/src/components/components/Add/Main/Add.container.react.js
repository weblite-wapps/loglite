// modules
import { connect } from 'react-redux'
// components
import Add from './Add.presentational.react'
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
  logs: state.App.logs,
  title: state.Add.title,
  selectedTags: state.Add.selectedTags,
  queryTag: state.Add.queryTag,
  suggestions: getAddFilteredSuggestions(state),
  tags: state.Add.tags,
  date: state.Add.date,
  startTime: state.Add.startTime,
  endTime: state.Add.endTime,
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
