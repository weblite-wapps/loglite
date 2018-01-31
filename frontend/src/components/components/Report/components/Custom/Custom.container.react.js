// modules
import { connect } from 'react-redux'
// components
import Custom from './Custom.presentational.react'
// actions
import {
  dispatchSetQuery,
  dispatchChangeSelectedTags,
  dispatchAddTag,
  dispatchCalculateTotalDuration,
  dispatchConvertJSONToCSV,
} from '../../Main/Report.action'
// selector
import { getReportFilteredSuggestions } from '../../../../Main/App.selector'


const mapStateToProps = state => ({
  queryTag: state.Report.queryTag,
  tags: state.Report.tags,
  startDate: state.Report.startDate,
  endDate: state.Report.endDate,
  suggestions: getReportFilteredSuggestions(state),
  CSV: state.Report.CSV,
})

const mapDispatchToProps = () => ({
  onQueryTagChange: dispatchSetQuery,
  onTagClick: dispatchChangeSelectedTags,
  addTag: dispatchAddTag,
  calculateTotalDuration: dispatchCalculateTotalDuration,
  convertJSONToCSV: dispatchConvertJSONToCSV,
})


export default connect(mapStateToProps, mapDispatchToProps)(Custom)
