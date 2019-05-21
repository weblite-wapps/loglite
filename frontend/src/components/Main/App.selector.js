import { createSelector } from 'reselect'
import * as R from 'ramda'

const getAddSuggestions = state => state.Add.suggestions
const getReportSuggestions = state => state.Report.suggestions
const getAddTags = state => state.Add.tags
const getReportTags = state => state.Report.tags

const getAddFilteredSuggestions = createSelector(
  [getAddSuggestions, getAddTags],
  (suggestions, tags) =>
    suggestions.filter(suggestion =>
      R.reduce(R.and, true, R.map(tag => tag.label !== suggestion.label, tags)),
    ),
)

const getReportFilteredSuggestions = createSelector(
  [getReportSuggestions, getReportTags],
  (suggestions, tags) =>
    suggestions.filter(suggestion =>
      R.reduce(R.and, true, R.map(tag => tag.label !== suggestion.label, tags)),
    ),
)

export { getAddFilteredSuggestions, getReportFilteredSuggestions }
