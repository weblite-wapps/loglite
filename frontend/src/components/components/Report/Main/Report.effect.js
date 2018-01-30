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

const resetStaffDataEpic = (action$, { getState }) =>
  action$.ofType(CHANGE_SELECTED_USER)
    .map(() => resetStaffLogs(getState().App.user.id))


const loadStaffDataEpic = (action$, { getState }) =>
  action$.ofType(RESET_STAFF_LOGS)
    .filter(() =>
      R.prop(getState().Report.selectedUser, getState().Report.currentPagesInventory) === undefined
      || !R.contains(format(getState().Report.currentPage, 'YYYY-MM-DD'),
        getState().Report.currentPagesInventory[getState().Report.selectedUser]))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => Promise.all([
      getRequest('/fetchLogs')
        .query({
          wis: getState().App.wis,
          userId: getState().Report.selectedUser,
          date: format(getState().Report.currentPage, 'YYYY-MM-DD'),
        })
        .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null),
      getRequest('/fetchTags')
        .query({
          wis: getState().App.wis,
          userId: getState().Report.selectedUser,
        })
        .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null),
    ]))
    .do(() => dispatchSetIsLoading(false))
    .mergeMap(success => ([
      getState().Report.selectedUser === getState().App.user.id ?
        loadLogsData(JSON.parse(success[0].text)) : loadStaffLogs(JSON.parse(success[0].text)),
      loadTagsDataInReport(JSON.parse(success[1].text)),
    ]))

const loadTagsDataEpic = action$ =>
  action$.ofType(LOAD_TAGS_DATA_IN_ADD)
    .map(action => loadTagsDataInReport(action.payload.tags))

const effectSearchTagsEpic = (action$, { getState }) =>
  action$.ofType(SET_QUERY)
    .pluck('payload')
    .filter(payload => payload.queryTag.trim() !== '')
    .debounceTime(250)
    .mergeMap(payload =>
      getRequest('/serachTags')
        .query({
          wis: getState().App.wis,
          userId: getState().Report.selectedUser,
          label: payload.queryTag,
        })
        .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .map(({ text }) => fetchTags(JSON.parse(text)))

const calculateTotalDurationEpic = (action$, { getState }) =>
  action$.ofType(CALCULATE_TOTAL_DURATION)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/calculateTotalDuration')
      .query({
        wis: getState().App.wis,
        userId: getState().Report.selectedUser,
        startDate: getState().Report.startDate,
        endDate: getState().Report.endDate,
        selectedTags: getState().Report.selectedTags,
      })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .do(() => dispatchSetIsLoading(false))
    .map(({ text }) => restoreTotalDuration(text))


const convertJSONToCSVEpic = (action$, { getState }) =>
  action$.ofType(CONVERT_JSON_TO_CSV)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/convertJSONToCSV')
      .query({
        wis: getState().App.wis,
        userId: getState().Report.selectedUser,
        startDate: getState().Report.startDate || new Date(),
        endDate: getState().Report.endDate || new Date(),
        selectedTags: getState().Report.selectedTags,
      })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .do(() => dispatchSetIsLoading(false))
    .map(({ text }) => restoreCSV(text))

const fetchPreviousDayLogsDataEpic = (action$, { getState }) =>
  action$.ofType(DECREMENT_CURRENT_PAGE)
    .filter(() => !R.contains(format(getState().Report.currentPage, 'YYYY-MM-DD'),
      getState().Report.currentPagesInventory[getState().Report.selectedUser]))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/fetchPreviousDayData')
      .query({
        wis: getState().App.wis,
        userId: getState().Report.selectedUser,
        date: format(getState().Report.currentPage, 'YYYY-MM-DD') })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .do(() => dispatchSetIsLoading(false))
    .map(({ text }) =>
      getState().Report.selectedUser === getState().App.user.id ?
        loadLogsData(JSON.parse(text)) : loadStaffLogs(JSON.parse(text)))

const fetchNextDayLogsDataEpic = (action$, { getState }) =>
  action$.ofType(INCREMENT_CURRENT_PAGE)
    .filter(() => !R.contains(format(getState().Report.currentPage, 'YYYY-MM-DD'),
      getState().Report.currentPagesInventory[getState().Report.selectedUser]))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/fetchNextDayData')
      .query({
        wis: getState().App.wis,
        userId: getState().Report.selectedUser,
        date: format(getState().Report.currentPage, 'YYYY-MM-DD') })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .do(() => dispatchSetIsLoading(false))
    .map(({ text }) =>
      getState().Report.selectedUser === getState().App.user.id ?
        loadLogsData(JSON.parse(text)) : loadStaffLogs(JSON.parse(text)))

const loadDataEpic = action$ =>
  action$.ofType(LOAD_LOGS_DATA, LOAD_STAFF_LOGS, RESET_STAFF_LOGS)
    .mapTo({ type: CHANGE_CURRENT_PAGES_INVENTORY })

const resetCSVEpic = action$ =>
  action$.ofType(RESTORE_CSV)
    .delay(1000)
    .mapTo({ type: RESET_CSV })

const updateChartEpic = (action$, { getState }) =>
  action$.ofType(UPDATE_CHART)
    .do(() => dispatchSetIsLoading(true))
    .pluck('payload')
    .mergeMap(payload => getRequest('/barChartData')
      .query({
        wis: getState().App.wis,
        userId: getState().Report.selectedUser,
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
