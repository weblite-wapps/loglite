// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../../setup/redux'
// helpers
import { previousDay, nextDay } from './Report.helper'
// actions
import {
  CHANGE_EXPAND_MODE,
  SET_API,
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
  PREVIOUS_PAGE,
  NEXT_PAGE,
  ADD_PAGE,
  REMOVE_PAGE,
  RESTORE_BAR_CHART_DATA,
  RESTORE_LEADERBOARD_DATA,
  CHANGE_ANCHOR_EL,
  CHANGE_IS_ERROR,
} from './Report.action'

// state
const initialState = {
  expandMode: 'workList',
  staffLogs: [],
  selectedUser: '',
  queryTag: '',
  suggestions: [],
  selectedTags: [],
  tags: [],
  startDate: '',
  endDate: '',
  totalDuration: 'Not calculated',
  CSV: '',
  currentPage: new Date(),
  pages: {},
  barChartData: [],
  anchorEl: null,
  isError: { startDate: false, endDate: false },
  leaderboard: [],
}

// lens
const selectedUserLens = R.lensProp('selectedUser')
const queryTagLens = R.lensProp('queryTag')
const startDateLens = R.lensProp('startDate')
const endDateLens = R.lensProp('endDate')
const totalDurationLens = R.lensProp('totalDuration')
const CSVLens = R.lensProp('CSV')
const currentPageLens = R.lensProp('currentPage')
const suggestionsLens = R.lensProp('suggestions')
const barChartDataLens = R.lensProp('barChartData')
const expandModeLens = R.lensProp('expandMode')
const anchorElLens = R.lensProp('anchorEl')
const isErrorLens = R.lensProp('isError')
const leaderboardLens = R.lensProp('leaderboard')

// views
export const staffLogsView = () => R.path(['Report', 'staffLogs'])(getState())
export const selectedUserView = () =>
  R.path(['Report', 'selectedUser'])(getState())
export const queryTagView = () => R.path(['Report', 'queryTag'])(getState())
export const selectedTagsView = () =>
  R.path(['Report', 'selectedTags'])(getState())
export const tagsView = () => R.path(['Report', 'tags'])(getState())
export const startDateView = () => R.path(['Report', 'startDate'])(getState())
export const endDateView = () => R.path(['Report', 'endDate'])(getState())
export const totalDurationView = () =>
  R.path(['Report', 'totalDuration'])(getState())
export const CSVView = () => R.path(['Report', 'CSV'])(getState())
export const currentPageView = () =>
  R.path(['Report', 'currentPage'])(getState())
export const pagesView = () => R.path(['Report', 'pages'])(getState())
export const barChartDataView = () =>
  R.path(['Report', 'barChartData'])(getState())
export const expandModeView = () => R.path(['Report', 'expandMode'])(getState())
export const anchorElView = () => R.path(['Report', 'anchorEl'])(getState())
export const isErrorView = () => R.path(['Report', 'isError'])(getState())
export const leaderboardView = () =>
  R.path(['Report', 'leaderboard'])(getState())

// reducers
const reducers = {
  [CHANGE_EXPAND_MODE]: (state, { value }) =>
    R.set(expandModeLens, value)(state),

  [SET_API]: (state, { user }) => ({ ...state, selectedUser: user.id }),

  [RESET_STAFF_LOGS]: (state, { userId }) => ({
    ...state,
    staffLogs: [],
    pages: R.mapObjIndexed(
      (num, key) => (key === userId ? num : {}),
      state.pages,
    ),
  }),

  [LOAD_STAFF_LOGS]: (state, { logs }) => ({
    ...state,
    staffLogs: R.concat(
      state.staffLogs,
      R.map(log => ({ ...log, popoverIsOpen: false }), logs),
    ),
  }),

  [LOAD_TAGS_DATA_IN_REPORT]: (state, { tags }) => ({
    ...state,
    tags: R.map(tag => R.assoc('isSelected', false, tag), tags),
  }),

  [SET_QUERY]: (state, { queryTag }) => R.set(queryTagLens, queryTag)(state),

  [FETCH_TAGS]: (state, { tags }) => R.set(suggestionsLens, tags, state),

  [ADD_TAG]: state => ({
    ...state,
    selectedTags: R.append(R.toLower(state.queryTag), state.selectedTags),
    tags: R.append(
      {
        label: R.toLower(state.queryTag),
        _id: state.tags.length,
        isSelected: true,
      },
      state.tags,
    ),
    queryTag: '',
  }),

  [CHANGE_SELECTED_TAGS]: (state, { tag }) => ({
    ...state,
    selectedTags: tag.isSelected
      ? R.remove(
          R.indexOf(tag.label, state.selectedTags),
          1,
          state.selectedTags,
        )
      : R.append(tag.label, state.selectedTags),
    tags: R.map(
      eachTag =>
        eachTag._id === tag._id
          ? { ...eachTag, isSelected: !eachTag.isSelected }
          : eachTag,
      state.tags,
    ),
  }),

  [CHANGE_START_DATE]: (state, { value }) => R.set(startDateLens, value, state),

  [CHANGE_END_DATE]: (state, { value }) => R.set(endDateLens, value, state),

  [CALCULATE_TOTAL_DURATION]: state =>
    R.set(totalDurationLens, 'calculating', state),

  [RESTORE_TOTAL_DUARTION]: (state, { totalDuration }) =>
    R.set(totalDurationLens, totalDuration, state),

  [CONVERT_JSON_TO_CSV]: state => state,

  [RESTORE_CSV]: (state, { CSV }) => R.set(CSVLens, CSV, state),

  [RESET_CSV]: state => R.set(CSVLens, '', state),

  [CHANGE_SELECTED_USER]: (state, { value }) =>
    R.set(selectedUserLens, value)(state),

  [PREVIOUS_PAGE]: state =>
    R.set(currentPageLens, previousDay(state.currentPage), state),

  [NEXT_PAGE]: state =>
    R.set(currentPageLens, nextDay(state.currentPage), state),

  [ADD_PAGE]: (state, { date, user }) => ({
    ...state,
    pages: {
      ...state.pages,
      [user]: R.uniq(R.append(date, state.pages[user])),
    },
  }),

  [REMOVE_PAGE]: (state, { date, user }) => ({
    ...state,
    pages: {
      ...state.pages,
      [user]: R.remove(R.indexOf(date, state.pages[user]), 1, state.pages.user),
    },
  }),

  [RESTORE_BAR_CHART_DATA]: (state, { data }) =>
    R.set(barChartDataLens, data, state),

  [RESTORE_LEADERBOARD_DATA]: (state, { data }) =>
    R.set(leaderboardLens, data, state),

  [CHANGE_ANCHOR_EL]: (state, { value }) => R.set(anchorElLens, value, state),

  [CHANGE_IS_ERROR]: (state, { value }) => R.set(isErrorLens, value, state),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
