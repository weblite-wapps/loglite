// modules
import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/debounceTime'
import format from 'date-fns/format'
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { getRequest } from './Report.helper'
// actions
import { LOAD_LOGS_DATA, loadLogsData, dispatchSetIsLoading } from '../../../Main/App.action'
import { LOAD_TAGS_DATA_IN_ADD } from '../../Add/Main/Add.action'
import {
  RESET_STAFF_LOGS, resetStaffLogs,
  LOAD_STAFF_LOGS, loadStaffLogs,
  RESTORE_CSV, restoreCSV,
  CHANGE_SELECTED_USER,
  SET_QUERY,
  CALCULATE_TOTAL_DURATION,
  CONVERT_JSON_TO_CSV,
  DECREMENT_CURRENT_PAGE,
  INCREMENT_CURRENT_PAGE,
  CHANGE_CURRENT_PAGES_INVENTORY,
  RESET_CSV,
  UPDATE_CHART,
  fetchTags,
  restoreTotalDuration,
  loadTagsDataInReport,
  restoreBarChartData,
} from './Report.action'
// views
import { wisView, userIdView } from '../../../Main/App.reducer'
import { startDateView, endDateView, selectedTagsView, selectedUserView, currentPageView, currentPagesInventoryView } from './Report.reducer'


const resetStaffDataEpic = action$ =>
  action$.ofType(CHANGE_SELECTED_USER)
    .map(() => resetStaffLogs(userIdView()))


const loadStaffDataEpic = action$ =>
  action$.ofType(RESET_STAFF_LOGS)
    .filter(() =>
      R.prop(selectedUserView(), currentPagesInventoryView()) === undefined
      || !R.contains(format(currentPageView(), 'YYYY-MM-DD'),
        currentPagesInventoryView()[selectedUserView()]))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => Promise.all([
      getRequest('/fetchLogs')
        .query({
          wis: wisView(),
          userId: selectedUserView(),
          date: format(currentPageView(), 'YYYY-MM-DD'),
        })
        .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null),
      getRequest('/fetchTags')
        .query({
          wis: wisView(),
          userId: selectedUserView(),
        })
        .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null),
    ]))
    .do(() => dispatchSetIsLoading(false))
    .mergeMap(success => ([
      selectedUserView() === userIdView() ?
        loadLogsData(JSON.parse(success[0].text)) : loadStaffLogs(JSON.parse(success[0].text)),
      loadTagsDataInReport(JSON.parse(success[1].text)),
    ]))

const loadTagsDataEpic = action$ =>
  action$.ofType(LOAD_TAGS_DATA_IN_ADD)
    .map(action => loadTagsDataInReport(action.payload.tags))

const effectSearchTagsEpic = action$ =>
  action$.ofType(SET_QUERY)
    .pluck('payload')
    .filter(payload => payload.queryTag.trim() !== '')
    .debounceTime(250)
    .mergeMap(payload => getRequest('/serachTags')
      .query({
        wis: wisView(),
        userId: selectedUserView(),
        label: payload.queryTag,
      })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .map(({ text }) => fetchTags(JSON.parse(text)))

const calculateTotalDurationEpic = action$ =>
  action$.ofType(CALCULATE_TOTAL_DURATION)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/calculateTotalDuration')
      .query({
        wis: wisView(),
        userId: selectedUserView(),
        startDate: startDateView(),
        endDate: endDateView(),
        selectedTags: selectedTagsView(),
      })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .do(() => dispatchSetIsLoading(false))
    .map(({ text }) => restoreTotalDuration(text))


const convertJSONToCSVEpic = action$ =>
  action$.ofType(CONVERT_JSON_TO_CSV)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/convertJSONToCSV')
      .query({
        wis: wisView(),
        userId: selectedUserView(),
        startDate: startDateView() || new Date(),
        endDate: endDateView() || new Date(),
        selectedTags: selectedTagsView(),
      })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .do(() => dispatchSetIsLoading(false))
    .map(({ text }) => restoreCSV(text))

const fetchPreviousDayLogsDataEpic = action$ =>
  action$.ofType(DECREMENT_CURRENT_PAGE)
    .filter(() => !R.contains(format(currentPageView(), 'YYYY-MM-DD'),
      currentPagesInventoryView()[selectedUserView()]))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/fetchPreviousDayData')
      .query({
        wis: wisView(),
        userId: selectedUserView(),
        date: format(currentPageView(), 'YYYY-MM-DD') })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .do(() => dispatchSetIsLoading(false))
    .map(({ text }) =>
      selectedUserView() === userIdView() ?
        loadLogsData(JSON.parse(text)) : loadStaffLogs(JSON.parse(text)))

const fetchNextDayLogsDataEpic = action$ =>
  action$.ofType(INCREMENT_CURRENT_PAGE)
    .filter(() => !R.contains(format(currentPageView(), 'YYYY-MM-DD'),
      currentPagesInventoryView()[selectedUserView()]))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/fetchNextDayData')
      .query({
        wis: wisView(),
        userId: selectedUserView(),
        date: format(currentPageView(), 'YYYY-MM-DD') })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .do(() => dispatchSetIsLoading(false))
    .map(({ text }) =>
      selectedUserView() === userIdView() ?
        loadLogsData(JSON.parse(text)) : loadStaffLogs(JSON.parse(text)))

const loadDataEpic = action$ =>
  action$.ofType(LOAD_LOGS_DATA, LOAD_STAFF_LOGS, RESET_STAFF_LOGS)
    .mapTo({ type: CHANGE_CURRENT_PAGES_INVENTORY })

const resetCSVEpic = action$ =>
  action$.ofType(RESTORE_CSV)
    .delay(1000)
    .mapTo({ type: RESET_CSV })

const updateChartEpic = action$ =>
  action$.ofType(UPDATE_CHART)
    .do(() => dispatchSetIsLoading(true))
    .pluck('payload')
    .mergeMap(payload => getRequest('/barChartData')
      .query({
        wis: wisView(),
        userId: selectedUserView(),
        startDate: payload.startDate,
        endDate: payload.endDate,
      })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .do(() => dispatchSetIsLoading(false))
    .map(({ text }) => restoreBarChartData(JSON.parse(text)))

export default combineEpics(
  resetStaffDataEpic,
  loadStaffDataEpic,
  effectSearchTagsEpic,
  loadTagsDataEpic,
  calculateTotalDurationEpic,
  convertJSONToCSVEpic,
  fetchPreviousDayLogsDataEpic,
  fetchNextDayLogsDataEpic,
  loadDataEpic,
  resetCSVEpic,
  updateChartEpic,
)
