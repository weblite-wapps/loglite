// modules
import * as R from 'ramda'
import { combineEpics, ofType } from 'redux-observable'
import {
  map,
  filter,
  tap,
  mergeMap,
  pluck,
  debounceTime,
  delay,
  mapTo,
  ignoreElements,
} from 'rxjs/operators'
import { push } from '../../../../setup/redux'
// local modules
import { dispatchChangeSnackbarStage } from '../../Snackbar/Snackbar.action'
// helpers
import { getParsedNow } from '../../../../helper/functions/time.helper'
import { getRequest } from '../../../../helper/functions/request.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
import { checkBeforeAddTag } from '../../../Main/App.helper'
import { checkBeforeAction } from './Report.helper'
// actions
import { loadLogsData, dispatchSetIsLoading } from '../../../Main/App.action'
import { dispatchChangeIsOpenDialog } from '../../../components/Edit/Main/Edit.action'
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
  HANDLE_UPDATE_LEADERBOARD,
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
  dispatchUpdateLeaderboard,
  CHANGE_EXPAND_MODE,
  EDIT_BUTTON_CLICK,
} from './Report.action'
// views
import { wisView, userIdView } from '../../../Main/App.reducer'
import {
  startDateView,
  endDateView,
  selectedTagsView,
  selectedUserView,
  currentPageView,
  pagesView,
  queryTagView,
  tagsView,
} from './Report.reducer'
import { dispatchInsertLog } from '../../Edit/Main/Edit.action'
// const
const { W } = window

const resetStaffDataEpic = action$ =>
  action$.pipe(
    ofType(CHANGE_SELECTED_USER),
    map(() => resetStaffLogs(userIdView())),
  )

const loadStaffDataEpic = action$ =>
  action$.pipe(
    ofType(RESET_STAFF_LOGS),
    filter(
      () =>
        R.prop(selectedUserView(), pagesView()) === undefined ||
        !R.contains(
          formattedDate(currentPageView()),
          pagesView()[selectedUserView()],
        ),
    ),
    tap(() =>
      dispatchAddPage(formattedDate(currentPageView()), selectedUserView()),
    ),
    tap(() => dispatchSetIsLoading(true)),
    mergeMap(() =>
      Promise.all([
        getRequest('/fetchLogs')
          .query({
            wis: wisView(),
            userId: selectedUserView(),
            date: formattedDate(currentPageView()),
          })
          .on('error', err => {
            if (err.status !== 304) {
              dispatchChangeSnackbarStage('Server disconnected!')
              dispatchRemovePage(
                formattedDate(currentPageView()),
                selectedUserView(),
              )
            }
          }),
        getRequest('/fetchTags')
          .query({
            wis: wisView(),
            userId: selectedUserView(),
          })
          .on(
            'error',
            err =>
              err.status !== 304 &&
              dispatchChangeSnackbarStage('Server disconnected!'),
          ),
      ]),
    ),
    tap(() => dispatchSetIsLoading(false)),
    mergeMap(success => [
      selectedUserView() === userIdView()
        ? loadLogsData(success[0].body)
        : loadStaffLogs(success[0].body),
      loadTagsDataInReport(success[1].body),
    ]),
  )

const loadTagsDataEpic = action$ =>
  action$.pipe(
    ofType(LOAD_TAGS_DATA_IN_ADD),
    map(action => loadTagsDataInReport(action.payload.tags)),
  )

const effectSearchTagsEpic = action$ =>
  action$.pipe(
    ofType(SET_QUERY),
    pluck('payload'),
    filter(payload => payload.queryTag.trim() !== ''),
    debounceTime(250),
    mergeMap(payload =>
      getRequest('/searchTags')
        .query({
          wis: wisView(),
          userId: selectedUserView(),
          label: payload.queryTag,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    ),
    map(({ body }) => fetchTags(body)),
  )

const calculateTotalDurationEpic = action$ =>
  action$.pipe(
    ofType(CALCULATE_TOTAL_DURATION),
    tap(() => dispatchSetIsLoading(true)),
    mergeMap(() =>
      getRequest('/calculateTotalDuration')
        .query({
          wis: wisView(),
          userId: selectedUserView(),
          startDate: startDateView(),
          endDate: endDateView(),
          selectedTags: selectedTagsView(),
          now: getParsedNow(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    ),
    tap(() => dispatchSetIsLoading(false)),
    tap(() => W && W.analytics('CALCULATE_CLICK')),
    map(({ body }) => restoreTotalDuration(body)),
  )

const convertJSONToCSVEpic = action$ =>
  action$.pipe(
    ofType(CONVERT_JSON_TO_CSV),
    tap(() => dispatchSetIsLoading(true)),
    mergeMap(() =>
      getRequest('/convertJSONToCSV')
        .query({
          wis: wisView(),
          userId: selectedUserView(),
          startDate: startDateView(),
          endDate: endDateView(),
          selectedTags: selectedTagsView(),
          now: getParsedNow(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    ),
    tap(() => dispatchSetIsLoading(false)),
    tap(() => W && W.analytics('EXPORT_CLICK')),
    map(({ text }) => restoreCSV(text)),
  )

const fetchPreviousDayLogsDataEpic = action$ =>
  action$.pipe(
    ofType(PREVIOUS_PAGE),
    filter(
      () =>
        !R.contains(
          formattedDate(currentPageView()),
          pagesView()[selectedUserView()],
        ),
    ),
    tap(() =>
      dispatchAddPage(formattedDate(currentPageView()), selectedUserView()),
    ),
    tap(() => dispatchSetIsLoading(true)),
    mergeMap(() =>
      getRequest('/fetchLogs')
        .query({
          wis: wisView(),
          userId: selectedUserView(),
          date: formattedDate(currentPageView()),
        })
        .on('error', err => {
          if (err.status !== 304) {
            dispatchChangeSnackbarStage('Server disconnected!')
            dispatchRemovePage(
              formattedDate(currentPageView()),
              selectedUserView(),
            )
          }
        }),
    ),
    tap(() => dispatchSetIsLoading(false)),
    tap(() => W && W.analytics('PREVIOUS_DAY_CLICK')),
    map(({ body }) =>
      selectedUserView() === userIdView()
        ? loadLogsData(body)
        : loadStaffLogs(body),
    ),
  )

const fetchNextDayLogsDataEpic = action$ =>
  action$.pipe(
    ofType(NEXT_PAGE),
    filter(
      () =>
        !R.contains(
          formattedDate(currentPageView()),
          pagesView()[selectedUserView()],
        ),
    ),
    tap(() =>
      dispatchAddPage(formattedDate(currentPageView()), selectedUserView()),
    ),
    tap(() => dispatchSetIsLoading(true)),
    mergeMap(() =>
      getRequest('/fetchLogs')
        .query({
          wis: wisView(),
          userId: selectedUserView(),
          date: formattedDate(currentPageView()),
        })
        .on('error', err => {
          if (err.status !== 304) {
            dispatchChangeSnackbarStage('Server disconnected!')
            dispatchRemovePage(
              formattedDate(currentPageView()),
              selectedUserView(),
            )
          }
        }),
    ),
    tap(() => dispatchSetIsLoading(false)),
    tap(() => W && W.analytics('NEXT_DAY_CLICK')),
    map(({ body }) =>
      selectedUserView() === userIdView()
        ? loadLogsData(body)
        : loadStaffLogs(body),
    ),
  )

const resetCSVEpic = action$ =>
  action$.pipe(
    ofType(RESTORE_CSV),
    delay(1000),
    mapTo({ type: RESET_CSV }),
  )

const updateChartEpic = action$ =>
  action$.pipe(
    ofType(UPDATE_CHART),
    tap(() => dispatchSetIsLoading(true)),
    pluck('payload'),
    mergeMap(({ startDate, endDate }) =>
      getRequest('/barChartData')
        .query({
          wis: wisView(),
          userId: selectedUserView(),
          startDate,
          endDate,
          now: getParsedNow(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    ),
    tap(() => dispatchSetIsLoading(false)),
    map(({ body }) => restoreBarChartData(body)),
  )

const updateLeaderboardEpic = action$ =>
  action$.pipe(
    ofType(UPDATE_LEADERBOARD),
    tap(() => dispatchSetIsLoading(true)),
    pluck('payload'),
    mergeMap(({ startDate, endDate }) =>
      getRequest('/leaderboardData')
        .query({
          wis: wisView(),
          startDate,
          endDate,
          now: getParsedNow(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    ),
    tap(() => dispatchSetIsLoading(false)),
    tap(() => W && W.analytics('UPDATE_LEADERBOARD')),
    map(({ body }) => restoreLeaderboardData(body)),
  )

// effects
const effectHandleAddTag = action$ =>
  action$.pipe(
    ofType(HANDLE_ADD_TAG),
    map(() => ({ ...checkBeforeAddTag(queryTagView(), tagsView()) })),
    tap(({ permission }) => permission && dispatchAddTag()),
    tap(
      ({ permission, message }) =>
        !permission && dispatchChangeSnackbarStage(message),
    ),
    ignoreElements(),
  )

const effectHandleCalculation = action$ =>
  action$.pipe(
    ofType(HANDLE_CALCULATION),
    map(() => ({ ...checkBeforeAction() })),
    tap(({ isError }) => dispatchChangeIsError(isError)),
    tap(({ permission }) => permission && dispatchCalculateTotalDuration()),
    tap(
      ({ permission, message }) =>
        !permission && dispatchChangeSnackbarStage(message),
    ),
    ignoreElements(),
  )

const effectHandleExport = action$ =>
  action$.pipe(
    ofType(HANDLE_EXPORT),
    map(() => ({ ...checkBeforeAction() })),
    tap(({ isError }) => dispatchChangeIsError(isError)),
    tap(({ permission }) => permission && dispatchConvertJSONToCSV()),
    tap(
      ({ permission, message }) =>
        !permission && dispatchChangeSnackbarStage(message),
    ),
    ignoreElements(),
  )

const effectHandleUpdateChart = action$ =>
  action$.pipe(
    ofType(HANDLE_UPDATE_CHART),
    pluck('payload'),
    map(payload => ({ ...payload, ...checkBeforeAction() })),
    tap(({ isError }) => dispatchChangeIsError(isError)),
    tap(
      ({ startDate, endDate, permission }) =>
        permission && dispatchUpdateChart(startDate, endDate),
    ),
    tap(
      ({ permission, message }) =>
        !permission && dispatchChangeSnackbarStage(message),
    ),
    ignoreElements(),
  )

const effectHandleUpdateLeaderboard = action$ =>
  action$.pipe(
    ofType(HANDLE_UPDATE_LEADERBOARD),
    pluck('payload'),
    map(payload => ({ ...payload, ...checkBeforeAction() })),
    tap(({ isError }) => dispatchChangeIsError(isError)),
    tap(
      ({ startDate, endDate, permission }) =>
        permission && dispatchUpdateLeaderboard(startDate, endDate),
    ),
    tap(
      ({ permission, message }) =>
        !permission && dispatchChangeSnackbarStage(message),
    ),
    ignoreElements(),
  )

const changeExpandModeEpic = action$ =>
  action$.pipe(
    ofType(CHANGE_EXPAND_MODE),
    pluck('payload'),
    tap(({ value }) => W && W.analytics('EXPAND_MODE_CLICK', { mode: value })),
    ignoreElements(),
  )

const handleEditButtonEpic = action$ =>
  action$.pipe(
    ofType(EDIT_BUTTON_CLICK),
    pluck('payload'),
    pluck('value'),
    tap(dispatchInsertLog),
    tap(() => dispatchChangeIsOpenDialog(true)),
    map(() => push('/Edit')),
    ignoreElements(),
  )
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
  effectHandleUpdateLeaderboard,
  changeExpandModeEpic,
  handleEditButtonEpic,
)
