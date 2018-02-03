// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { formatTime, getRequest, postRequest } from './App.helper'
import { formattedDate, getToday, getStartDayOfWeek, getStartDayOfMonth } from '../../helper/functions/date.helper'
// actions
import { RESET_INPUTS, dispatchLoadTagsDataInAdd } from '../components/Add/Main/Add.action'
import { addPage } from '../components/Report/Main/Report.action'
import { REFETCH_TOTAL_DURATION, dispatchLoadTotalDurations } from '../components/Home/Main/Home.action'
import {
  FETCH_TODAY_DATA,
  ADD_LOG_TO_NEXT_DAY,
  RESTORE_LOG,
  DELETE_LOG,
  SAVE_START_TIME,
  SAVE_END_TIME,
  FETCH_ADMIN_DATA,
  loadUsersData,
  restoreLog,
  dispatchLoadLogsData,
  dispatchLoadUsersData,
  dispatchFetchAdminData,
  dispatchChangeRunningId,
  dispatchSetIsLoading,
  dispatchChangeExpandingId,
} from './App.action'
// views
import { wisView, userIdView, userNameView, creatorView } from './App.reducer'
import { currentPageView, selectedUserView } from '../components/Report/Main/Report.reducer'


const fetchUsersEpic = action$ =>
  action$.ofType(FETCH_ADMIN_DATA)
    .filter(() => creatorView())
    .mergeMap(() => getRequest('/fetchUsers')
      .query({ wis: wisView() })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .map(({ body }) => loadUsersData((body)))

const saveUsersEpic = action$ =>
  action$.ofType(FETCH_TODAY_DATA)
    .mergeMap(() => postRequest('/saveUser')
      .send({ wis: wisView(), userId: userIdView(), username: userNameView() })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body }) => body && dispatchLoadUsersData([body]))
    .map(() => dispatchFetchAdminData())

const initialFetchEpic = action$ =>
  action$.ofType(FETCH_TODAY_DATA)
    .mergeMap(() => getRequest('/initialFetch')
      .query({
        wis: wisView(),
        userId: userIdView(),
        username: userNameView(),
        today: getToday(),
        startOfWeek: getStartDayOfWeek(),
        startOfMonth: getStartDayOfMonth(),
      })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body: { logs } }) => dispatchLoadLogsData(logs))
    .do(({ body: { tags } }) => dispatchLoadTagsDataInAdd(tags))
    .do(({ body: { totalDurations } }) => dispatchLoadTotalDurations(totalDurations))
    .map(() => addPage(formattedDate(currentPageView()), selectedUserView()))
    .do(() => window.W && window.W.start())

const addLogToNextDayEpic = action$ =>
  action$.ofType(ADD_LOG_TO_NEXT_DAY)
    .mergeMap(action => postRequest('/insertLogToNextDay')
      .send({
        title: action.payload.title,
        expanded: false,
        tags: action.payload.tags,
        times: [{ start: formatTime('00:00'), end: action.payload.end }],
        date: action.payload.date,
        id: userIdView(),
        wis: wisView(),
      })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .map(({ body }) => restoreLog(body))

const deleteLogEpic = action$ =>
  action$.ofType(DELETE_LOG)
    .mergeMap(action => postRequest('/deleteLog')
      .query({ _id: action.payload._id })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .mapTo({ type: REFETCH_TOTAL_DURATION })

const saveStartTimeEpic = action$ =>
  action$.ofType(SAVE_START_TIME)
    .pluck('payload')
    .do(payload => dispatchChangeExpandingId(payload._id))
    .do(payload => dispatchChangeRunningId(payload._id))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(payload => postRequest('/saveStartTime')
      .send({
        startTime: payload.start,
        _id: payload._id,
      })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

const saveEndTimeEpic = action$ =>
  action$.ofType(SAVE_END_TIME)
    .pluck('payload')
    .do(() => dispatchChangeExpandingId(''))
    .do(() => dispatchChangeRunningId(''))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(payload => postRequest('/saveEndTime')
      .send({
        endTime: payload.end,
        _id: payload._id,
      })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .mapTo({ type: REFETCH_TOTAL_DURATION })

const resetEpic = action$ =>
  action$.ofType(RESTORE_LOG)
    .mapTo({ type: RESET_INPUTS })


export default combineEpics(
  fetchUsersEpic,
  saveUsersEpic,
  initialFetchEpic,
  addLogToNextDayEpic,
  deleteLogEpic,
  saveStartTimeEpic,
  saveEndTimeEpic,
  resetEpic,
)
