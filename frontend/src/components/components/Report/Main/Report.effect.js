// modules
import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { getRequest } from './Report.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
// actions
import { loadLogsData, dispatchSetIsLoading } from '../../../Main/App.action'
import { LOAD_TAGS_DATA_IN_ADD } from '../../Add/Main/Add.action'
import {
  RESET_STAFF_LOGS,
  RESTORE_CSV,
  CHANGE_SELECTED_USER,
  SET_QUERY,
  CALCULATE_TOTAL_DURATION,
  CONVERT_JSON_TO_CSV,
  PREVIOUS_PAGE,
  NEXT_PAGE,
  RESET_CSV,
  UPDATE_CHART,
  restoreCSV,
  loadStaffLogs,
  resetStaffLogs,
  fetchTags,
  restoreTotalDuration,
  loadTagsDataInReport,
  restoreBarChartData,
  dispatchAddPage,
  dispatchRemovePage,
} from './Report.action'
// views
import { wisView, userIdView } from '../../../Main/App.reducer'
import { startDateView, endDateView, selectedTagsView, selectedUserView, currentPageView, pagesView } from './Report.reducer'


const resetStaffDataEpic = action$ =>
  action$.ofType(CHANGE_SELECTED_USER)
    .map(() => resetStaffLogs(userIdView()))


const loadStaffDataEpic = action$ =>
  action$.ofType(RESET_STAFF_LOGS)
    .filter(() =>
      R.prop(selectedUserView(), pagesView()) === undefined
      || !R.contains(formattedDate(currentPageView()),
        pagesView()[selectedUserView()]))
    .do(() =>
      dispatchAddPage(formattedDate(currentPageView()), selectedUserView()))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => Promise.all([
      getRequest('/fetchLogs')
        .query({
          wis: wisView(),
          userId: selectedUserView(),
          date: formattedDate(currentPageView()),
        })
        .on('error', (err) => {
          if (err.status !== 304) {
            snackbarMessage({ message: 'Server disconnected!' })
            dispatchRemovePage(formattedDate(currentPageView()), selectedUserView())
          }
        }),
      getRequest('/fetchTags')
        .query({ wis: wisView(), userId: selectedUserView() })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
    ]))
    .do(() => dispatchSetIsLoading(false))
    .mergeMap(success => ([
      selectedUserView() === userIdView() ?
        loadLogsData(success[0].body) : loadStaffLogs(success[0].body),
      loadTagsDataInReport(success[1].body),
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
      .query({ wis: wisView(), userId: selectedUserView(), label: payload.queryTag })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .map(({ body }) => fetchTags(body))

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
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
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
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .map(({ text }) => restoreCSV(text))

const fetchPreviousDayLogsDataEpic = action$ =>
  action$.ofType(PREVIOUS_PAGE)
    .filter(() => !R.contains(formattedDate(currentPageView()),
      pagesView()[selectedUserView()]))
    .do(() =>
      dispatchAddPage(formattedDate(currentPageView()), selectedUserView()))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/fetchPreviousDayData')
      .query({
        wis: wisView(),
        userId: selectedUserView(),
        date: formattedDate(currentPageView()) })
      .on('error', (err) => {
        if (err.status !== 304) {
          snackbarMessage({ message: 'Server disconnected!' })
          dispatchRemovePage(formattedDate(currentPageView()), selectedUserView())
        }
      }))
    .do(() => dispatchSetIsLoading(false))
    .map(({ body }) =>
      selectedUserView() === userIdView() ?
        loadLogsData(body) : loadStaffLogs(body))

const fetchNextDayLogsDataEpic = action$ =>
  action$.ofType(NEXT_PAGE)
    .filter(() => !R.contains(formattedDate(currentPageView()),
      pagesView()[selectedUserView()]))
    .do(() =>
      dispatchAddPage(formattedDate(currentPageView()), selectedUserView()))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/fetchNextDayData')
      .query({
        wis: wisView(),
        userId: selectedUserView(),
        date: formattedDate(currentPageView()) })
      .on('error', (err) => {
        if (err.status !== 304) {
          snackbarMessage({ message: 'Server disconnected!' })
          dispatchRemovePage(formattedDate(currentPageView()), selectedUserView())
        }
      }))
    .do(() => dispatchSetIsLoading(false))
    .map(({ body }) =>
      selectedUserView() === userIdView() ?
        loadLogsData(body) : loadStaffLogs(body))

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
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .map(({ body }) => restoreBarChartData(body))

export default combineEpics(
  resetStaffDataEpic,
  loadStaffDataEpic,
  effectSearchTagsEpic,
  loadTagsDataEpic,
  calculateTotalDurationEpic,
  convertJSONToCSVEpic,
  fetchPreviousDayLogsDataEpic,
  fetchNextDayLogsDataEpic,
  resetCSVEpic,
  updateChartEpic,
)
