// modules
import { connect } from 'react-redux'
// components
import Custom from './Custom.presentational.react'
// views
import { queryTagView, tagsView, CSVView, startDateView, endDateView } from '../../Main/Report.reducer'
// actions
import {
  dispatchSetQuery,
  dispatchChangeSelectedTags,
  dispatchAddTag,
  dispatchCalculateTotalDuration,
  dispatchConvertJSONToCSV,
  dispatchChangeStartDate,
  dispatchChangeEndDate,
} from '../../Main/Report.action'
// selector
import { getReportFilteredSuggestions } from '../../../../Main/App.selector'


const mapStateToProps = state => ({
  queryTag: queryTagView(),
  tags: tagsView(),
  suggestions: getReportFilteredSuggestions(state),
  CSV: CSVView(),
  startDate: startDateView(),
  endDate: endDateView(),
})

const mapDispatchToProps = () => ({
  onQueryTagChange: dispatchSetQuery,
  onTagClick: dispatchChangeSelectedTags,
  addTag: dispatchAddTag,
  calculateTotalDuration: dispatchCalculateTotalDuration,
  convertJSONToCSV: dispatchConvertJSONToCSV,
  onStartDateChange: ({ target: { value } }) => dispatchChangeStartDate(value),
  onEndDateChange: ({ target: { value } }) => dispatchChangeEndDate(value),
})


export default connect(mapStateToProps, mapDispatchToProps)(Custom)
