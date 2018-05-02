// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { snackbarMessage } from 'weblite-web-snackbar'
import { push } from 'react-router-redux'
// helpers
import { getRequest, postRequest } from '../../helper/functions/request.helper'
import { formatTime } from '../../helper/functions/time.helper'
import { formattedDate, getToday, previousDay } from '../../helper/functions/date.helper'
// actions
import { dispatchLoadTagsDataInAdd } from '../components/Add/Main/Add.action'
import { dispatchAddPage } from '../components/Report/Main/Report.action'
import { dispatchRefetchTotalDuration, dispatchLoadTotalDurations, dispatchChangeRunningId } from '../components/Home/Main/Home.action'
import {
  FETCH_TODAY_DATA,
  ADD_LOG_TO_NEXT_DAY,
  HANDLE_DELETE_LOG,
  HANDLE_SAVE_START_TIME,
  HANDLE_SAVE_END_TIME,
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
} from './App.action'
// views
import { wisView, userIdView, userNameView, creatorView, aboutModeView } from './App.reducer'
import { selectedUserView } from '../components/Report/Main/Report.reducer'


const fetchUsersEpic = action$ =>
  action$.ofType(FETCH_ADMIN_DATA)
    .filter(() => creatorView())
    .mergeMap(() => getRequest('/fetchUsers')
      .query({ wis: wisView() })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body }) => dispatchLoadUsersData((body)))
    .ignoreElements()


const saveUsersEpic = action$ =>
  action$.ofType(FETCH_TODAY_DATA)
    .mergeMap(() => postRequest('/saveUser')
      .send({ wis: wisView(), userId: userIdView(), username: userNameView() })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body }) => body && dispatchLoadUsersData([body]))
    .do(() => dispatchFetchAdminData())
    .ignoreElements()


const initialFetchEpic = action$ =>
  action$.ofType(FETCH_TODAY_DATA)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/initialFetch')
      .query({
        wis: wisView(),
        userId: userIdView(),
        username: userNameView(),
        today: getToday(),
      })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body: { logs } }) => dispatchLoadLogsData(logs))
    .do(({ body: { tags } }) => dispatchLoadTagsDataInAdd(tags))
    .do(({ body: { totalDurations } }) => dispatchLoadTotalDurations(totalDurations))
    .do(() => dispatchAddPage(formattedDate(previousDay(new Date())), selectedUserView()))
    .do(() => dispatchAddPage(formattedDate(new Date()), selectedUserView()))
    .do(() => dispatchSetIsLoading(false))
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
        created_at: new Date(),
        userId: userIdView(),
        wis: wisView(),
      })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .do(() => dispatchAddPage(formattedDate(new Date()), selectedUserView()))
    .do(({ body }) => dispatchAddLog(body))
    .ignoreElements()


const effectDeleteLog = action$ =>
  action$.ofType(HANDLE_DELETE_LOG)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(action => postRequest('/deleteLog')
      .query({ _id: action.payload._id })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .do(({ body }) => dispatchDeleteLog(body._id))
    .do(() => snackbarMessage({ message: 'Deleted successfully !' }))
    .do(() => dispatchChangePopoverId(''))
    .do(() => dispatchRefetchTotalDuration())
    .ignoreElements()


const effectSaveStartTime = action$ =>
  action$.ofType(HANDLE_SAVE_START_TIME)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .delay(250)
    .mergeMap(({ _id, start }) => postRequest('/saveStartTime')
      .send({ _id, start })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .do(({ body: { _id, start } }) => dispatchSaveStartTime(_id, start))
    .do(({ body: { _id } }) => dispatchChangeRunningId(_id))
    .ignoreElements()


const effectSaveEndTime = action$ =>
  action$.ofType(HANDLE_SAVE_END_TIME)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, end }) => postRequest('/saveEndTime')
      .send({ _id, end })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .do(({ body: { _id, end } }) => dispatchSaveEndTime(_id, end))
    .do(() => dispatchChangeRunningId(''))
    .do(() => dispatchRefetchTotalDuration())
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
  changeTabEpic,
  setAboutModeEpic,
)
