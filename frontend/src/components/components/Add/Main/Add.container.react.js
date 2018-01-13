// modules
import { connect } from 'react-redux'
// components
import Add from './Add.presentational.react'
// actions
import {
  changeInputName,
  setQueryInAdd,
  changeSelectedTagsInAdd,
  addTag,
} from './Add.action'
import { changeTab, addLog, addCustomLog } from '../../../Main/App.action'
import { changeSnackbarStage } from '../../Snackbar/Snackbar.action'
// selector
import { getAddFilteredSuggestions } from '../../../Main/App.selector'


const mapStateToProps = state => ({
  logs: state.App.logs,
  inputName: state.Add.inputName,
  selectedTags: state.Add.selectedTags,
  queryTag: state.Add.queryTag,
  suggestions: getAddFilteredSuggestions(state),
  tags: state.Add.tags,
  date: state.Add.date,
  startTime: state.Add.startTime,
  endTime: state.Add.endTime,
})

const mapDispatchToProps = dispatch => ({
  onInputNameChange: value => dispatch(changeInputName(value)),
  onQueryTagChange: query => dispatch(setQueryInAdd(query)),
  onTagClick: tag => dispatch(changeSelectedTagsInAdd(tag)),
  addTag: () => dispatch(addTag()),
  addLog: (title, tags) => dispatch(addLog(title, tags)),
  changeTab: value => dispatch(changeTab(value)),
  addCustomLog: (title, tags, date, start, end) =>
    dispatch(addCustomLog(title, tags, date, start, end)),
  changeSnackbarStage: (value, message) => dispatch(changeSnackbarStage(value, message)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Add)
