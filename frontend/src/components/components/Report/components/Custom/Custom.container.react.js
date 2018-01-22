// modules
import { connect } from 'react-redux'
// components
import Custom from './Custom.presentational.react'
// actions
import {
  setQuery,
  changeSelectedTags,
  addTag,
  calculateTotalDuration,
  convertJSONToCSV,
} from '../../Main/Report.action'
// selector
import { getReportFilteredSuggestions } from '../../../../Main/App.selector'


const mapStateToProps = state => ({
  queryTag: state.Report.queryTag,
  tags: state.Report.tags,
  startDate: state.Report.startDate,
  endDate: state.Report.endDate,
  suggestions: getReportFilteredSuggestions(state),
})

const mapDispatchToProps = dispatch => ({
  onQueryTagChange: query => dispatch(setQuery(query)),
  onTagClick: tag => dispatch(changeSelectedTags(tag)),
  addTag: () => dispatch(addTag()),
  calculateTotalDuration: () => dispatch(calculateTotalDuration()),
  convertJSONToCSV: () => dispatch(convertJSONToCSV()),
})


export default connect(mapStateToProps, mapDispatchToProps)(Custom)
