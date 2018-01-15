// modules
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/ignoreElements'
import format from 'date-fns/format'
import startOfWeek from 'date-fns/start_of_week'
import startOfMonth from 'date-fns/start_of_month'
import subDays from 'date-fns/sub_days'
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { formatTime, getRequest, postRequest } from './App.helper'
import {
  loadTodayTotalDuration,
  loadThisWeekTotalDuration,
  loadThisMonthTotalDuration,
  refetchTotalDuration,
} from '../components/Home/Main/Home.action'
import {
  resetInputs,
  loadTagsDataInAdd,
} from '../components/Add/Main/Add.action'
import {
  FETCH_TODAY_DATA,
  ADD_LOG_TO_NEXT_DAY,
  RESTORE_LOG,
  RESTORE_CUSTOM_LOG,
  DELETE_LOG,
  SAVE_START_TIME,
  SAVE_END_TIME,
  loadLogsData,
  restoreLog,
} from './App.action'


const fetchTodayDataEpic = (action$, { getState }) =>
  action$.ofType(FETCH_TODAY_DATA)
    .mergeMap(() => Promise.all([
      getRequest('/fetchLogs')
        .query({ wis: getState().App.wis, date: format(new Date(), 'YYYY-MM-DD') }),
      getRequest('/fetchTags')
        .query({ wis: getState().App.wis }),
      postRequest('/todayTotalDuration')
        .send({
          wis: getState().App.wis,
          date: format(new Date(), 'YYYY-MM-DD'),
        }),
      postRequest('/thisWeekTotalDurations')
        .send({
          wis: getState().App.wis,
          startDate: subDays(startOfWeek(new Date()), 1),
          endDate: new Date(),
        }),
      postRequest('/thisMonthTotalDurations')
        .send({
          wis: getState().App.wis,
          startDate: startOfMonth(new Date()),
          endDate: new Date(),
        }),
    ]))
    .mergeMap(success => ([
      loadLogsData(JSON.parse(success[0].text)),
      loadTagsDataInAdd(JSON.parse(success[1].text)),
      loadTodayTotalDuration(success[2].text),
      loadThisWeekTotalDuration(success[3].text),
      loadThisMonthTotalDuration(success[4].text),
    ]))
    .do(() => window.W && window.W.start())

const addLogToNextDayEpic = (action$, { getState }) =>
  action$.ofType(ADD_LOG_TO_NEXT_DAY)
    .mergeMap(action => postRequest('/insertLogToNextDay')
      .send({
        title: action.payload.title,
        expanded: false,
        tags: action.payload.tags,
        times: [{ start: formatTime('00:00'), end: formatTime(action.payload.end) }],
        date: action.payload.date,
        wis: getState().App.wis,
      }))
    .map(success => restoreLog(JSON.parse(success.text)))

const deleteLogEpic = action$ =>
  action$.ofType(DELETE_LOG)
    .mergeMap(action => postRequest('/deleteLog')
      .query({ _id: action.payload._id })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .mapTo(refetchTotalDuration())

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
        endTime: new Date(),
        _id: action.payload._id,
      })
      .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .mapTo(refetchTotalDuration())

const resetEpic = action$ =>
  action$.ofType(RESTORE_LOG, RESTORE_CUSTOM_LOG)
    .mapTo(resetInputs())


export default combineEpics(
  fetchTodayDataEpic,
  addLogToNextDayEpic,
  deleteLogEpic,
  saveStartTimeEpic,
  saveEndTimeEpic,
  resetEpic,
)
