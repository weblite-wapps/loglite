// modules
import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { getRequest } from '../../../../helper/functions/request.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
import { checkBeforeAddTag } from '../../../Main/App.helper'
import { checkBeforeAction } from './Report.helper'
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
  UPDATE_LEADERBOARD,
  HANDLE_ADD_TAG,
  HANDLE_CALCULATION,
  HANDLE_EXPORT,
  HANDLE_UPDATE_CHART,
  restoreCSV,
  loadStaffLogs,
  resetStaffLogs,
  fetchTags,
  restoreTotalDuration,
  loadTagsDataInReport,
  restoreBarChartData,
  restoreLeaderboardData,
  dispatchAddPage,
  dispatchRemovePage,
  dispatchChangeIsError,
  dispatchAddTag,
  dispatchCalculateTotalDuration,
  dispatchConvertJSONToCSV,
  dispatchUpdateChart,
} from './Report.action'
// views
import { wisView, userIdView } from '../../../Main/App.reducer'
import { startDateView, endDateView, selectedTagsView, selectedUserView, currentPageView, pagesView, queryTagView, tagsView } from './Report.reducer'


const resetStaffDataEpic = action$ =>
  action$.ofType(CHANGE_SELECTED_USER)
    .map(() => resetStaffLogs(userIdView()))


const loadStaffDataEpic = action$ =>
  action$.ofType(RESET_STAFF_LOGS)
    .filter(() => R.prop(selectedUserView(), pagesView()) === undefined ||
      !R.contains(formattedDate(currentPageView()), pagesView()[selectedUserView()]))
    .do(() => dispatchAddPage(formattedDate(currentPageView()), selectedUserView()))
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
    .map(({ body }) => restoreTotalDuration(body))


const convertJSONToCSVEpic = action$ =>
  action$.ofType(CONVERT_JSON_TO_CSV)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/convertJSONToCSV')
      .query({
        wis: wisView(),
        userId: selectedUserView(),
        startDate: startDateView(),
        endDate: endDateView(),
        selectedTags: selectedTagsView(),
      })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .map(({ text }) => restoreCSV(text))


const fetchPreviousDayLogsDataEpic = action$ =>
  action$.ofType(PREVIOUS_PAGE)
    .filter(() => !R.contains(formattedDate(currentPageView()), pagesView()[selectedUserView()]))
    .do(() => dispatchAddPage(formattedDate(currentPageView()), selectedUserView()))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/fetchLogs')
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
    .filter(() => !R.contains(formattedDate(currentPageView()), pagesView()[selectedUserView()]))
    .do(() => dispatchAddPage(formattedDate(currentPageView()), selectedUserView()))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/fetchLogs')
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
    .mergeMap(({ startDate, endDate }) => getRequest('/barChartData')
      .query({
        wis: wisView(),
        userId: selectedUserView(),
        startDate,
        endDate,
      })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .map(({ body }) => restoreBarChartData(body))


const updateLeaderboardEpic = action$ =>
  action$.ofType(UPDATE_LEADERBOARD)
    .do(() => dispatchSetIsLoading(true))
    .pluck('payload')
    .mergeMap(({ startDate, endDate }) => getRequest('/leaderboardData')
      .query({
        wis: wisView(),
        startDate,
        endDate,
      })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .map(({ body }) => restoreLeaderboardData(body))

// effects
const effectHandleAddTag = action$ =>
  action$.ofType(HANDLE_ADD_TAG)
    .map(() => ({ ...checkBeforeAddTag(queryTagView(), tagsView()) }))
    .do(({ permission }) => permission && dispatchAddTag())
    .do(({ permission, message }) => !permission && snackbarMessage({ message }))
    .ignoreElements()


const effectHandleCalculation = action$ =>
  action$.ofType(HANDLE_CALCULATION)
    .map(() => ({ ...checkBeforeAction() }))
    .do(({ isError }) => dispatchChangeIsError(isError))
    .do(({ permission }) => permission && dispatchCalculateTotalDuration())
    .do(({ permission, message }) => !permission && snackbarMessage({ message }))
    .ignoreElements()


const effectHandleExport = action$ =>
  action$.ofType(HANDLE_EXPORT)
    .map(() => ({ ...checkBeforeAction() }))
    .do(({ isError }) => dispatchChangeIsError(isError))
    .do(({ permission }) => permission && dispatchConvertJSONToCSV())
    .do(({ permission, message }) => !permission && snackbarMessage({ message }))
    .ignoreElements()


const effectHandleUpdateChart = action$ =>
  action$.ofType(HANDLE_UPDATE_CHART)
    .pluck('payload')
    .map(payload => ({ ...payload, ...checkBeforeAction() }))
    .do(({ isError }) => dispatchChangeIsError(isError))
    .do(({ startDate, endDate, permission }) =>
      permission && dispatchUpdateChart(startDate, endDate))
    .do(({ permission, message }) => !permission && snackbarMessage({ message }))
    .ignoreElements()


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
  updateLeaderboardEpic,
  effectHandleAddTag,
  effectHandleCalculation,
  effectHandleExport,
  effectHandleUpdateChart,
)
