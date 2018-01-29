// modules
import { connect } from 'react-redux'
// components
import Add from './Add.presentational.react'
// actions
import { changeTab, addLog, addCustomLog } from '../../../Main/App.action'
import {
  changeTitle,
  setQueryInAdd,
  changeSelectedTagsInAdd,
  addTagInAdd,
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

const mapDispatchToProps = dispatch => ({
  onTitleChange: value => dispatch(changeTitle(value)),
  onQueryTagChange: query => dispatch(setQueryInAdd(query)),
  onTagClick: tag => dispatch(changeSelectedTagsInAdd(tag)),
  addTag: () => dispatch(addTagInAdd()),
  addLog: (title, tags) => dispatch(addLog(title, tags)),
  changeTab: value => dispatch(changeTab(value)),
  addCustomLog: (title, tags, date, start, end) =>
    dispatch(addCustomLog(title, tags, date, start, end)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Add)
