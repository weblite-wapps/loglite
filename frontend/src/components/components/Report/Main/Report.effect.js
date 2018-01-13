// modules
import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/debounceTime'
import format from 'date-fns/format'
// helpers
import { getRequest } from './Report.helper'
// actions
import { changeSnackbarStage } from '../../Snackbar/Snackbar.action'
import { LOAD_LOGS_DATA, loadLogsData, setIsLoading } from '../../../Main/App.action'
import { LOAD_TAGS_DATA_IN_ADD } from '../../Add/Main/Add.action'
import {
  SET_QUERY,
  CALCULATE_TOTAL_DURATION,
  CONVERT_JSON_TO_CSV,
  DECREMENT_CURRENT_PAGE,
  INCREMENT_CURRENT_PAGE,
  CHANGE_CURRENT_PAGES_INVENTORY,
  RESTORE_CSV,
  RESET_CSV,
  UPDATE_CHART,
  fetchTags,
  restoreTotalDuration,
  restoreCSV,
  loadTagsDataInReport,
  restoreBarChartData,
} from './Report.action'

const loadTagsDataEpic = action$ =>
  action$.ofType(LOAD_TAGS_DATA_IN_ADD)
    .map(action => loadTagsDataInReport(action.payload.tags))

const effectSearchTagsEpic = (action$, { getState, dispatch }) =>
  action$.ofType(SET_QUERY)
    .pluck('payload')
    .filter(payload => payload.queryTag.trim() !== '')
    .debounceTime(250)
    .mergeMap(payload =>
      getRequest('/serachTags')
        .query({ wis: getState().App.wis, label: payload.queryTag })
        .on('error', err => err.status !== 304 ? dispatch(changeSnackbarStage(true, 'Server dissonncted!')) : null))
    .map(success => fetchTags(JSON.parse(success.text)))

const calculateTotalDurationEpic = (action$, { getState, dispatch }) =>
  action$.ofType(CALCULATE_TOTAL_DURATION)
    .do(() => dispatch(setIsLoading(true)))
    .mergeMap(() => getRequest('/calculateTotalDuration')
      .query({
        wis: getState().App.wis,
        startDate: getState().Report.startDate,
        endDate: getState().Report.endDate,
        selectedTags: getState().Report.selectedTags,
      })
      .on('error', err => err.status !== 304 ? dispatch(changeSnackbarStage(true, 'Server dissonncted!')) : null))
    .do(() => dispatch(setIsLoading(false)))
    .map(success => restoreTotalDuration(success.text))

const convertJSONToCSVEpic = (action$, { getState, dispatch }) =>
  action$.ofType(CONVERT_JSON_TO_CSV)
    .do(() => dispatch(setIsLoading(true)))
    .mergeMap(() => getRequest('/convertJSONToCSV')
      .query({
        wis: getState().App.wis,
        startDate: getState().Report.startDate,
        endDate: getState().Report.endDate,
        selectedTags: getState().Report.selectedTags,
      })
      .on('error', err => err.status !== 304 ? dispatch(changeSnackbarStage(true, 'Server dissonncted!')) : null))
    .do(() => dispatch(setIsLoading(false)))
    .map(success => restoreCSV(success.text))

const fetchPreviousDayLogsDataEpic = (action$, { getState, dispatch }) =>
  action$.ofType(DECREMENT_CURRENT_PAGE)
    .filter(() => !R.contains(format(getState().Report.currentPage, 'YYYY-MM-DD'), getState().Report.currentPagesInventory))
    .do(() => dispatch(setIsLoading(true)))
    .mergeMap(() => getRequest('/fetchPreviousDayData')
      .query({ wis: getState().App.wis, date: format(getState().Report.currentPage, 'YYYY-MM-DD') })
      .on('error', err => err.status !== 304 ? dispatch(changeSnackbarStage(true, 'Server dissonncted!')) : null))
    .do(() => dispatch(setIsLoading(false)))
    .map(success => loadLogsData(JSON.parse(success.text)))

const fetchNextDayLogsDataEpic = (action$, { getState, dispatch }) =>
  action$.ofType(INCREMENT_CURRENT_PAGE)
    .filter(() => !R.contains(format(getState().Report.currentPage, 'YYYY-MM-DD'), getState().Report.currentPagesInventory))
    .do(() => dispatch(setIsLoading(true)))
    .mergeMap(() => getRequest('/fetchNextDayData')
      .query({ wis: getState().App.wis, date: format(getState().Report.currentPage, 'YYYY-MM-DD') })
      .on('error', err => err.status !== 304 ? dispatch(changeSnackbarStage(true, 'Server dissonncted!')) : null))
    .do(() => dispatch(setIsLoading(false)))
    .map(success => loadLogsData(JSON.parse(success.text)))

const loadDataEpic = action$ =>
  action$.ofType(LOAD_LOGS_DATA)
    .mapTo({ type: CHANGE_CURRENT_PAGES_INVENTORY })

const resetCSVEpic = action$ =>
  action$.ofType(RESTORE_CSV)
    .delay(1000)
    .mapTo({ type: RESET_CSV })

const updateChartEpic = (action$, { getState, dispatch }) =>
  action$.ofType(UPDATE_CHART)
    .do(() => dispatch(setIsLoading(true)))
    .pluck('payload')
    .mergeMap(payload => getRequest('/barChartData')
      .query({
        wis: getState().App.wis,
        startDate: payload.startDate,
        endDate: payload.endDate,
      })
      .on('error', err => err.status !== 304 ? dispatch(changeSnackbarStage(true, 'Server dissonncted!')) : null))
    .do(() => dispatch(setIsLoading(false)))
    .map(success => restoreBarChartData(JSON.parse(success.text)))

export default combineEpics(
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
