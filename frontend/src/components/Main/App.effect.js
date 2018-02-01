// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { startOfWeek, startOfMonth, subDays } from 'date-fns'
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { formatTime, getRequest, postRequest } from './App.helper'
import { formattedDate } from '../../helper/functions/date.helper'
// actions
import { RESET_INPUTS, loadTagsDataInAdd } from '../components/Add/Main/Add.action'
import { dispatchAddPage } from '../components/Report/Main/Report.action'
import {
  REFETCH_TOTAL_DURATION,
  loadTodayTotalDuration,
  loadThisWeekTotalDuration,
  loadThisMonthTotalDuration,
} from '../components/Home/Main/Home.action'
import {
  FETCH_TODAY_DATA,
  ADD_LOG_TO_NEXT_DAY,
  RESTORE_LOG,
  DELETE_LOG,
  SAVE_START_TIME,
  SAVE_END_TIME,
  loadUsersData,
  loadLogsData,
  restoreLog,
  dispatchChangeRunningId,
  dispatchSetIsLoading,
  dispatchChangeExpandingId,
} from './App.action'
// views
import { wisView, userIdView, userNameView, creatorView } from './App.reducer'
import { currentPageView, selectedUserView } from '../components/Report/Main/Report.reducer'

const fetchUsersEpic = action$ =>
  action$.ofType(FETCH_TODAY_DATA)
    .filter(() => creatorView())
    .mergeMap(() => getRequest('/fetchUsers')
      .query({ wis: wisView() }))
    .map(({ text }) => loadUsersData(JSON.parse(text)))

// TODO: initialFetch
// const initialFetchEpic = action$ =>
//   action$.ofType(FETCH_TODAY_DATA)
//     .mergeMap(() => getRequest('/initialFetch')
//       .query({
//         wis: wisView(),
//         userId: userIdView(),
//         username: userNameView(),
//         today: formattedDate(new Date()),
//         startOfWeek: subDays(startOfWeek(new Date()), 1),
//         startOfMonth: startOfMonth(new Date()),
//       }))
//     .map(({ text }) => restoreData(text))
//     .do(() => window.W && window.W.start())

const fetchTodayDataEpic = action$ =>
  action$.ofType(FETCH_TODAY_DATA)
    .mergeMap(() => Promise.all([
      getRequest('/fetchLogs')
        .query({
          wis: wisView(),
          userId: userIdView(),
          date: formattedDate(new Date()),
        }),
      getRequest('/fetchTags')
        .query({
          wis: wisView(),
          userId: userIdView(),
        }),
      postRequest('/todayTotalDuration')
        .send({
          wis: wisView(),
          userId: userIdView(),
          date: formattedDate(new Date()),
        }),
      postRequest('/thisWeekTotalDurations')
        .send({
          wis: wisView(),
          userId: userIdView(),
          startDate: subDays(startOfWeek(new Date()), 1),
          endDate: new Date(),
        }),
      postRequest('/thisMonthTotalDurations')
        .send({
          wis: wisView(),
          userId: userIdView(),
          startDate: startOfMonth(new Date()),
          endDate: new Date(),
        }),
      postRequest('/saveUser')
        .send({
          wis: wisView(),
          userId: userIdView(),
          username: userNameView(),
        }),
    ]))
    .mergeMap(success => ([
      loadLogsData(JSON.parse(success[0].text)),
      loadTagsDataInAdd(JSON.parse(success[1].text)),
      loadTodayTotalDuration(success[2].text),
      loadThisWeekTotalDuration(success[3].text),
      loadThisMonthTotalDuration(success[4].text),
      dispatchAddPage(formattedDate(currentPageView()), selectedUserView()),
    ]))
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
      }))
    .map(({ text }) => restoreLog(JSON.parse(text)))

const deleteLogEpic = action$ =>
  action$.ofType(DELETE_LOG)
    .mergeMap(action => postRequest('/deleteLog')
      .query({ _id: action.payload._id })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server disconnected!' }) : null))
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
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server disconnected!' }) : null))
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
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server disconnected!' }) : null))
    .do(() => dispatchSetIsLoading(false))
    .mapTo({ type: REFETCH_TOTAL_DURATION })

const resetEpic = action$ =>
  action$.ofType(RESTORE_LOG)
    .mapTo({ type: RESET_INPUTS })


export default combineEpics(
  fetchUsersEpic,
  fetchTodayDataEpic,
  addLogToNextDayEpic,
  deleteLogEpic,
  saveStartTimeEpic,
  saveEndTimeEpic,
  resetEpic,
)
