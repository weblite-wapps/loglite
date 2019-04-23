// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
// import { snackbarMessage } from 'weblite-web-snackbar'
import { push } from 'react-router-redux'
// helpers
import { getUnique } from './App.helper' 
import { getRequest, postRequest } from '../../helper/functions/request.helper'
import { formatTime, sumTimes } from '../../helper/functions/time.helper'
import { formattedDate, getToday, previousDay } from '../../helper/functions/date.helper'
// actions
import { dispatchLoadTagsDataInAdd } from '../components/Add/Main/Add.action'
import { dispatchAddPage, dispatchRestoreLeaderboardData } from '../components/Report/Main/Report.action'
import { dispatchRefetchTotalDuration, dispatchLoadTotalDurations, dispatchChangeRunningId, dispatchSetSecondsElapsed } from '../components/Home/Main/Home.action'
import {
  FETCH_TODAY_DATA,
  ADD_LOG_TO_NEXT_DAY,
  HANDLE_DELETE_LOG,
  HANDLE_SAVE_START_TIME,
  HANDLE_SAVE_END_TIME,
  HANDLE_TOGGLE_IS_PINNED,
  FETCH_ADMIN_DATA,
  CHANGE_TAB,
  SET_ABOUT_MODE,
  dispatchAddLog,
  dispatchDeleteLog,
  dispatchLoadLogsData,
  dispatchLoadUsersData,
  dispatchFetchAdminData,
  dispatchSetIsLoading,
  dispatchSetAboutMode,
  dispatchChangePopoverId,
  dispatchSaveStartTime,
  dispatchSaveEndTime,
  dispatchToggleIsPinned,
  dispatchHandleSaveStartTime,
} from './App.action'
// views
import { wisView, userIdView, userNameView, aboutModeView } from './App.reducer'
import { selectedUserView } from '../components/Report/Main/Report.reducer'


const fetchUsersEpic = action$ =>
  action$.ofType(FETCH_ADMIN_DATA)
    .mergeMap(() => getRequest('/fetchUsers')
      .query({ wis: wisView() }))
      // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body }) => dispatchLoadUsersData((body)))
    .ignoreElements()


const saveUsersEpic = action$ =>
  action$.ofType(FETCH_TODAY_DATA)
    .mergeMap(() => postRequest('/saveUser')
      .send({ wis: wisView(), userId: userIdView(), username: userNameView() }))
      // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body }) => body && dispatchLoadUsersData([body]))
    .do(() => dispatchFetchAdminData())
    .ignoreElements()


const initialFetchEpic = action$ =>
  action$.ofType(FETCH_TODAY_DATA)
    // .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/initialFetch')
      .query({
        wis: wisView(),
        userId: userIdView(),
        username: userNameView(),
        today: getToday(),
      }))
      // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body: { logs } }) => dispatchLoadLogsData(logs))
    .do(({ body: { tags } }) => dispatchLoadTagsDataInAdd(tags))
    .do(({ body: { totalDurations } }) => dispatchLoadTotalDurations(totalDurations))
    .do(({ body: { leaderboard } }) => dispatchRestoreLeaderboardData(leaderboard))
    // .do(({ body: { pins } }) => console.log('pins', pins, 'unique', getUnique(pins)))
    .mergeMap(({ body: { pins } }) => postRequest('/saveLogs')
      .send({
        pins: getUnique(pins),
        userId: userIdView(),
        wis: wisView(),
      }))
      // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body }) => dispatchLoadLogsData(body))
    .do(() => dispatchAddPage(formattedDate(previousDay(new Date())), selectedUserView()))
    .do(() => dispatchAddPage(formattedDate(new Date()), selectedUserView()))
    // .do(() => dispatchSetIsLoading(false))
    .do(() => window.W && window.W.start())
    .ignoreElements()


const addLogToNextDayEpic = action$ =>
  action$.ofType(ADD_LOG_TO_NEXT_DAY)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ title, tags, end, date }) => postRequest('/insertLogToNextDay')
      .send({
        title,
        tags,
        times: [{ start: previousDay(formatTime('24:00:00')), end }],
        date,
        userId: userIdView(),
        wis: wisView(),
      }))
      // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .do(() => dispatchAddPage(formattedDate(new Date()), selectedUserView()))
    .do(({ body }) => dispatchAddLog(body))
    .ignoreElements()


const effectDeleteLog = action$ =>
  action$.ofType(HANDLE_DELETE_LOG)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(action => postRequest('/deleteLog')
      .query({ _id: action.payload._id }))
      // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .do(({ body }) => dispatchDeleteLog(body._id))
    // .do(() => snackbarMessage({ message: 'Deleted successfully !' }))
    .do(() => dispatchChangePopoverId(''))
    .do(() => dispatchRefetchTotalDuration())
    .ignoreElements()


const effectSaveStartTime = action$ =>
  action$.ofType(HANDLE_SAVE_START_TIME)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .delay(250)
    .mergeMap(({ _id, start }) => postRequest('/saveStartTime')
      .send({ _id, start }))
      // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .do(({ body: { _id, start } }) => dispatchSaveStartTime(_id, start))
    .do(({ body: { _id } }) => dispatchChangeRunningId(_id))
    .ignoreElements()


const effectSaveEndTime = action$ =>
  action$.ofType(HANDLE_SAVE_END_TIME)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ runningId, end, _id, times }) => postRequest('/saveEndTime')
      .send({ runningId, end: new Date(end), _id, times }))
      // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .do(({ body: { runningId, end } }) => dispatchSaveEndTime(runningId, end))
    .do(() => dispatchChangeRunningId(''))
    .do(() => dispatchRefetchTotalDuration())
    .filter(({ body: { _id } }) => _id)
    .do(({ body: { times } }) => dispatchSetSecondsElapsed(sumTimes(times)))
    .do(({ body: { _id, end } }) => dispatchHandleSaveStartTime(_id, end))
    .ignoreElements()


const effectToggleIsPinned = action$ =>
  action$.ofType(HANDLE_TOGGLE_IS_PINNED)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, title, tags, value }) => postRequest('/toggleIsPinned')
      .send({
        _id,
        title,
        tags,
        value,
        userId: userIdView(),
        wis: wisView(),
      }))
      // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .do(({ body: { _id, value } }) => dispatchToggleIsPinned(_id, value))
    .ignoreElements()

const changeTabEpic = (action$, { dispatch }) =>
  action$.ofType(CHANGE_TAB)
    .pluck('payload')
    .do(() => aboutModeView() === true && dispatchSetAboutMode(false))
    .do(({ value }) => value === 'Home' && dispatch(push('/')))
    .do(({ value }) => value !== 'Home' && dispatch(push(`/${value}`)))
    .ignoreElements()


const setAboutModeEpic = action$ =>
  action$.ofType(SET_ABOUT_MODE)
    .map(() => push('/About'))


export default combineEpics(
  fetchUsersEpic,
  saveUsersEpic,
  initialFetchEpic,
  addLogToNextDayEpic,
  effectDeleteLog,
  effectSaveStartTime,
  effectSaveEndTime,
  effectToggleIsPinned,
  changeTabEpic,
  setAboutModeEpic,
)
