// modules
import * as R from 'ramda'
import format from 'date-fns/format'
// helpers
import { previousDay, nextDay } from './Report.helper'
// actions
import {
  RESET_STAFF_LOGS,
  LOAD_STAFF_LOGS,
  LOAD_TAGS_DATA_IN_REPORT,
  SET_QUERY,
  FETCH_TAGS,
  ADD_TAG,
  CHANGE_SELECTED_TAGS,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  CALCULATE_TOTAL_DURATION,
  RESTORE_TOTAL_DUARTION,
  CONVERT_JSON_TO_CSV,
  RESTORE_CSV,
  RESET_CSV,
  CHANGE_SELECTED_USER,
  DECREMENT_CURRENT_PAGE,
  INCREMENT_CURRENT_PAGE,
  CHANGE_CURRENT_PAGES_INVENTORY,
  RESTORE_BAR_CHART_DATA,
} from './Report.action'

// state
const initialState = {
  staffLogs: [],
  selectedUser: '120',
  queryTag: '',
  suggestions: [],
  selectedTags: [],
  tags: [],
  startDate: '',
  endDate: '',
  totalDuration: 'Not calculated',
  CSV: '',
  currentPage: new Date(),
  currentPagesInventory: {},
  barChartData: [],
}


// lens & views
const selectedUserLens = R.lensProp('selectedUser')
const queryTagLens = R.lensProp('queryTag')
const startDateLens = R.lensProp('startDate')
const endDateLens = R.lensProp('endDate')
const totalDurationLens = R.lensProp('totalDuration')
const CSVLens = R.lensProp('CSV')
const currentPageLens = R.lensProp('currentPage')
const suggestionsLens = R.lensProp('suggestions')
const barChartDataLens = R.lensProp('barChartData')


// reducers
const reducers = {
  [RESET_STAFF_LOGS]: (state, { userId }) => ({ ...state,
    staffLogs: [],
    currentPagesInventory:
      R.mapObjIndexed((num, key) => key === userId ? num : null, state.currentPagesInventory),
  }),

  [LOAD_STAFF_LOGS]: (state, { logs }) => ({ ...state,
    staffLogs: R.concat(state.staffLogs,
      R.map(log => ({ ...log,
        popoverIsOpen: false,
      }), logs)),
  }),

  [LOAD_TAGS_DATA_IN_REPORT]: (state, { tags }) => ({ ...state,
    tags: R.map(tag => R.assoc('isSelected', false, tag), tags),
  }),

  [SET_QUERY]: (state, { queryTag }) => R.set(queryTagLens, queryTag)(state),

  [FETCH_TAGS]: (state, { tags }) => R.set(suggestionsLens, tags, state),

  [ADD_TAG]: state => ({ ...state,
    selectedTags: R.append(R.toLower(state.queryTag), state.selectedTags),
    tags: R.append(
      { label: R.toLower(state.queryTag),
        _id: state.tags.length,
        isSelected: true },
      state.tags),
    queryTag: '',
  }),

  [CHANGE_SELECTED_TAGS]: (state, { tag }) => ({ ...state,
    selectedTags: tag.isSelected ?
      R.remove(R.indexOf(tag.label, state.selectedTags), 1, state.selectedTags) :
      R.append(tag.label, state.selectedTags),
    tags: R.map(eachTag => (eachTag._id === tag._id) ?
      { ...eachTag, isSelected: !eachTag.isSelected } : eachTag, state.tags),
  }),

  [CHANGE_START_DATE]: (state, { value }) => R.set(startDateLens, value, state),

  [CHANGE_END_DATE]: (state, { value }) => R.set(endDateLens, value, state),

  [CALCULATE_TOTAL_DURATION]: state => R.set(totalDurationLens, 'calculating', state),

  [RESTORE_TOTAL_DUARTION]:
    (state, { totalDuration }) => R.set(totalDurationLens, totalDuration, state),

  [CONVERT_JSON_TO_CSV]: state => state,

  [RESTORE_CSV]: (state, { CSV }) => R.set(CSVLens, CSV, state),

  [RESET_CSV]: state => R.set(CSVLens, '', state),

  [CHANGE_SELECTED_USER]: (state, { value }) => R.set(selectedUserLens, value)(state),

  [DECREMENT_CURRENT_PAGE]: state => R.set(currentPageLens, previousDay(state.currentPage), state),

  [INCREMENT_CURRENT_PAGE]: state => R.set(currentPageLens, nextDay(state.currentPage), state),

  [CHANGE_CURRENT_PAGES_INVENTORY]: state => ({ ...state,
    currentPagesInventory: { ...state.currentPagesInventory,
      [state.selectedUser]: R.uniq(R.append(format(state.currentPage, 'YYYY-MM-DD'),
        state.currentPagesInventory[state.selectedUser])),
    },
  }),

  [RESTORE_BAR_CHART_DATA]: (state, { data }) => R.set(barChartDataLens, data, state),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
