// modules
import { createAction } from 'redux-actions'


// actions
const LOAD_TAGS_DATA_IN_REPORT = 'LOAD_TAGS_DATA_IN_REPORT'
const loadTagsDataInReport = createAction(LOAD_TAGS_DATA_IN_REPORT, tags => ({ tags }))

const SET_QUERY = 'SET_QUERY'
const setQuery = createAction(SET_QUERY, queryTag => ({ queryTag }))

const FETCH_TAGS = 'FETCH_TAGS'
const fetchTags = createAction(FETCH_TAGS, tags => ({ tags }))

const ADD_TAG = 'ADD_TAG'
const addTag = createAction(ADD_TAG)

const CHANGE_SELECTED_TAGS = 'CHANGE_SELECTED_TAGS'
const changeSelectedTags = createAction(CHANGE_SELECTED_TAGS, tag => ({ tag }))

const CHANGE_START_DATE = 'CHANGE_START_DATE'
const changeStartDate = createAction(CHANGE_START_DATE, value => ({ value }))

const CHANGE_END_DATE = 'CHANGE_END_DATE'
const changeEndDate = createAction(CHANGE_END_DATE, value => ({ value }))

const CALCULATE_TOTAL_DURATION = 'CALCULATE_TOTAL_DURATION'
const calculateTotalDuration = createAction(CALCULATE_TOTAL_DURATION)

const RESTORE_TOTAL_DUARTION = 'RESTORE_TOTAL_DUARTION'
const restoreTotalDuration = createAction(
  RESTORE_TOTAL_DUARTION,
  totalDuration => ({ totalDuration }),
)

const CONVERT_JSON_TO_CSV = 'CONVERT_JSON_TO_CSV'
const convertJSONToCSV = createAction(CONVERT_JSON_TO_CSV)

const RESTORE_CSV = 'RESTORE_CSV'
const restoreCSV = createAction(RESTORE_CSV, CSV => ({ CSV }))

const RESET_CSV = 'RESET_CSV'
const resetCSV = createAction(RESET_CSV)

const CHANGE_SELECTED_USER = 'CHANGE_SELECTED_USER'
const changeSelectedUser = createAction(CHANGE_SELECTED_USER, value => ({ value }))

const DECREMENT_CURRENT_PAGE = 'DECREMENT_CURRENT_PAGE'
const decrementCurrentPage = createAction(DECREMENT_CURRENT_PAGE)

const INCREMENT_CURRENT_PAGE = 'INCREMENT_CURRENT_PAGE'
const incrementCurrentPage = createAction(INCREMENT_CURRENT_PAGE)

const CHANGE_CURRENT_PAGES_INVENTORY = 'CHANGE_CURRENT_PAGES_INVENTORY'
const changeCurrentPagesInventory = createAction(CHANGE_CURRENT_PAGES_INVENTORY)

const UPDATE_CHART = 'UPDATE_CHART'
const updateChart = createAction(UPDATE_CHART, (startDate, endDate) => ({ startDate, endDate }))

const RESTORE_BAR_CHART_DATA = 'RESTORE_BAR_CHART_DATA'
const restoreBarChartData = createAction(RESTORE_BAR_CHART_DATA, data => ({ data }))

export {
  LOAD_TAGS_DATA_IN_REPORT, loadTagsDataInReport,
  SET_QUERY, setQuery,
  FETCH_TAGS, fetchTags,
  ADD_TAG, addTag,
  CHANGE_SELECTED_TAGS, changeSelectedTags,
  CHANGE_START_DATE, changeStartDate,
  CHANGE_END_DATE, changeEndDate,
  CALCULATE_TOTAL_DURATION, calculateTotalDuration,
  RESTORE_TOTAL_DUARTION, restoreTotalDuration,
  CONVERT_JSON_TO_CSV, convertJSONToCSV,
  RESTORE_CSV, restoreCSV,
  RESET_CSV, resetCSV,
  CHANGE_SELECTED_USER, changeSelectedUser,
  DECREMENT_CURRENT_PAGE, decrementCurrentPage,
  INCREMENT_CURRENT_PAGE, incrementCurrentPage,
  CHANGE_CURRENT_PAGES_INVENTORY, changeCurrentPagesInventory,
  UPDATE_CHART, updateChart,
  RESTORE_BAR_CHART_DATA, restoreBarChartData,
}
