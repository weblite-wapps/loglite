// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { snackbarMessage } from 'weblite-web-snackbar'
import { push } from 'react-router-redux'
// helpers
import { getRequest, postRequest } from './App.helper'
import { formatTime } from '../../helper/functions/time.helper'
import { formattedDate, getToday, previousDay } from '../../helper/functions/date.helper'
// actions
import { RESET_INPUTS, dispatchLoadTagsDataInAdd } from '../components/Add/Main/Add.action'
import { dispatchAddPage } from '../components/Report/Main/Report.action'
import { REFETCH_TOTAL_DURATION, dispatchLoadTotalDurations } from '../components/Home/Main/Home.action'
import {
  FETCH_TODAY_DATA,
  ADD_LOG_TO_NEXT_DAY,
  RESTORE_LOG,
  DELETE_LOG,
  SAVE_START_TIME,
  SAVE_END_TIME,
  FETCH_ADMIN_DATA,
  CHANGE_TAB,
  SET_ABOUT_MODE,
  loadUsersData,
  restoreLog,
  dispatchLoadLogsData,
  dispatchLoadUsersData,
  dispatchFetchAdminData,
  dispatchChangeRunningId,
  dispatchSetIsLoading,
  dispatchSetAboutMode,
  dispatchChangePopoverId,
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
    .map(({ body }) => loadUsersData((body)))

const saveUsersEpic = action$ =>
  action$.ofType(FETCH_TODAY_DATA)
    .mergeMap(() => postRequest('/saveUser')
      .send({ wis: wisView(), userId: userIdView(), username: userNameView() })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body }) => body && dispatchLoadUsersData([body]))
    .map(dispatchFetchAdminData)

const initialFetchEpic = action$ =>
  action$.ofType(FETCH_TODAY_DATA)
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
    .do(() => window.W && window.W.start())
    .ignoreElements()

const addLogToNextDayEpic = action$ =>
  action$.ofType(ADD_LOG_TO_NEXT_DAY)
    .pluck('payload')
    .mergeMap(({ title, tags, end, date }) => postRequest('/insertLogToNextDay')
      .send({
        title,
        tags,
        times: [{ start: previousDay(formatTime('24:00:00')), end }],
        date,
        userId: userIdView(),
        wis: wisView(),
      })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchAddPage(formattedDate(new Date()), selectedUserView()))
    .map(({ body }) => restoreLog(body))

const deleteLogEpic = action$ =>
  action$.ofType(DELETE_LOG)
    .mergeMap(action => postRequest('/deleteLog')
      .query({ _id: action.payload._id })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => snackbarMessage({ message: 'Deleted successfully !' }))
    .do(() => dispatchChangePopoverId(''))
    .mapTo({ type: REFETCH_TOTAL_DURATION })

const saveStartTimeEpic = action$ =>
  action$.ofType(SAVE_START_TIME)
    .pluck('payload')
    .do(payload => dispatchChangeRunningId(payload._id))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, start }) => postRequest('/saveStartTime')
      .send({ start, _id })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

const saveEndTimeEpic = action$ =>
  action$.ofType(SAVE_END_TIME)
    .pluck('payload')
    .do(() => dispatchChangeRunningId(''))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ end, _id }) => postRequest('/saveEndTime')
      .send({ end, _id })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .mapTo({ type: REFETCH_TOTAL_DURATION })

const resetEpic = action$ =>
  action$.ofType(RESTORE_LOG)
    .mapTo({ type: RESET_INPUTS })

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
  deleteLogEpic,
  saveStartTimeEpic,
  saveEndTimeEpic,
  resetEpic,
  changeTabEpic,
  setAboutModeEpic,
)
