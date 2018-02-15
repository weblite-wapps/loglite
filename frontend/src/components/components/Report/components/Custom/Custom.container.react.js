// modules
import { connect } from 'react-redux'
// components
import Custom from './Custom.presentational.react'
// views
import { queryTagView, tagsView, startDateView, endDateView, CSVView } from '../../Main/Report.reducer'
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
  queryTag: queryTagView(),
  tags: tagsView(),
  startDate: startDateView(),
  endDate: endDateView(),
  suggestions: getReportFilteredSuggestions(state),
  CSV: CSVView(),
})

const mapDispatchToProps = () => ({
  onQueryTagChange: dispatchSetQuery,
  onTagClick: dispatchChangeSelectedTags,
  addTag: dispatchAddTag,
  calculateTotalDuration: dispatchCalculateTotalDuration,
  convertJSONToCSV: dispatchConvertJSONToCSV,
})


export default connect(mapStateToProps, mapDispatchToProps)(Custom)
