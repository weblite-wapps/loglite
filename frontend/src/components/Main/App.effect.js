// modules
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/ignoreElements'
import 'rxjs/add/operator/filter'
import format from 'date-fns/format'
import startOfWeek from 'date-fns/start_of_week'
import startOfMonth from 'date-fns/start_of_month'
import subDays from 'date-fns/sub_days'
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { formatTime, getRequest, postRequest } from './App.helper'
// actions
import { RESET_INPUTS, loadTagsDataInAdd, resetInputs } from '../components/Add/Main/Add.action'
import {
  loadTodayTotalDuration,
  loadThisWeekTotalDuration,
  loadThisMonthTotalDuration,
  REFETCH_TOTAL_DURATION,
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
} from './App.action'


const fetchUsersEpic = (action$, { getState }) =>
  action$.ofType(FETCH_TODAY_DATA)
    .filter(() => getState().App.creator)
    .mergeMap(() => getRequest('/fetchUsers')
      .query({
        wis: getState().App.wis,
      }),
    ).map(success => loadUsersData(JSON.parse(success.text)))

const fetchTodayDataEpic = (action$, { getState }) =>
  action$.ofType(FETCH_TODAY_DATA)
    .mergeMap(() => Promise.all([
      getRequest('/fetchLogs')
        .query({
          wis: getState().App.wis,
          userId: getState().App.user.id,
          date: format(new Date(), 'YYYY-MM-DD'),
        }),
      getRequest('/fetchTags')
        .query({
          wis: getState().App.wis,
          userId: getState().App.user.id,
        }),
      postRequest('/todayTotalDuration')
        .send({
          wis: getState().App.wis,
          userId: getState().App.user.id,
          date: format(new Date(), 'YYYY-MM-DD'),
        }),
      postRequest('/thisWeekTotalDurations')
        .send({
          wis: getState().App.wis,
          userId: getState().App.user.id,
          startDate: subDays(startOfWeek(new Date()), 1),
          endDate: new Date(),
        }),
      postRequest('/thisMonthTotalDurations')
        .send({
          wis: getState().App.wis,
          userId: getState().App.user.id,
          startDate: startOfMonth(new Date()),
          endDate: new Date(),
        }),
      postRequest('/saveUser')
        .send({
          wis: getState().App.wis,
          userId: getState().App.user.id,
          username: getState().App.user.name,
        }),
    ]))
    .mergeMap(success => ([
      loadLogsData(JSON.parse(success[0].text)),
      loadTagsDataInAdd(JSON.parse(success[1].text)),
      loadTodayTotalDuration(success[2].text),
      loadThisWeekTotalDuration(success[3].text),
      loadThisMonthTotalDuration(success[4].text),
      resetInputs(),
    ]))
    .do(() => window.W && window.W.start())

const addLogToNextDayEpic = (action$, { getState }) =>
  action$.ofType(ADD_LOG_TO_NEXT_DAY)
    .mergeMap(action => postRequest('/insertLogToNextDay')
      .send({
        title: action.payload.title,
        expanded: false,
        tags: action.payload.tags,
        times: [{ start: formatTime('00:00'), end: action.payload.end }],
        date: action.payload.date,
        id: getState().App.user.id,
        wis: getState().App.wis,
      }))
    .map(success => restoreLog(JSON.parse(success.text)))

const deleteLogEpic = action$ =>
  action$.ofType(DELETE_LOG)
    .mergeMap(action => postRequest('/deleteLog')
      .query({ _id: action.payload._id })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .mapTo({ type: REFETCH_TOTAL_DURATION })

const saveStartTimeEpic = action$ =>
  action$.ofType(SAVE_START_TIME)
    .mergeMap(action => postRequest('/saveStartTime')
      .send({
        startTime: new Date(),
        _id: action.payload._id,
      })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .ignoreElements()

const saveEndTimeEpic = action$ =>
  action$.ofType(SAVE_END_TIME)
    .mergeMap(action => postRequest('/saveEndTime')
      .send({
        endTime: action.payload.end
        _id: action.payload._id,
      })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
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
