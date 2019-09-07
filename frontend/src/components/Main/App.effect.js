// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import * as R from 'ramda'
// import moment from 'moment-timezone'
import { dispatchChangeSnackbarStage } from '../components/Snackbar/Snackbar.action'
import { push } from '../../setup/redux'
// helpers
import { getUnique, mapToUsername, isUniqueLog, getLog } from './App.helper'
import { getRequest, postRequest } from '../../helper/functions/request.helper'
import {
  formatTime,
  sumTimes,
  getNow,
  getParsedNow,
} from '../../helper/functions/time.helper'
import {
  formattedDate,
  getToday,
  previousDay,
} from '../../helper/functions/date.helper'
// actions
import { dispatchLoadTagsDataInAdd } from '../components/Add/Main/Add.action'
import {
  dispatchAddPage,
  dispatchRestoreLeaderboardData,
} from '../components/Report/Main/Report.action'
import {
  dispatchRefetchTotalDuration,
  dispatchLoadTotalDurations,
  dispatchChangeRunningId,
  dispatchSetSecondsElapsed,
  dispatchSetToday,
} from '../components/Home/Main/Home.action'
import {
  FETCH_TODAY_DATA,
  ADD_LOG_TO_NEXT_DAY,
  HANDLE_DELETE_LOG,
  HANDLE_SAVE_START_TIME,
  HANDLE_SAVE_END_TIME,
  HANDLE_TOGGLE_IS_PINNED,
  CHANGE_TAB,
  SET_ABOUT_MODE,
  dispatchAddLog,
  dispatchDeleteLog,
  dispatchLoadLogsData,
  dispatchLoadUsersData,
  dispatchSetIsLoading,
  dispatchSetAboutMode,
  dispatchChangePopoverId,
  dispatchSaveStartTime,
  dispatchSaveEndTime,
  dispatchToggleIsPinned,
  dispatchHandleSaveStartTime,
  dispatchSortOnFrequentlyUsage,
  DELETE_LOG,
  SAVE_START_TIME,
  SAVE_END_TIME,
  SAVE_END_TIME_REALTIME,
  DELETE_LOG_REALTIME,
  SAVE_START_TIME_REALTIME,
  ADD_LOG_TO_NEXT_DAY_REALTIME,
} from './App.action'
// views
import { wisView, userIdView, userNameView, aboutModeView } from './App.reducer'
import { selectedUserView } from '../components/Report/Main/Report.reducer'
// selectors
import { getTotalDuration } from '../components/Home/components/Summary/Summary.selector'
import { pulse } from '../../helper/functions/realTime.helper'

const saveUsersEpic = action$ =>
  action$
    .ofType(FETCH_TODAY_DATA)
    .mergeMap(() =>
      postRequest('/saveUser')
        .send({
          wis: wisView(),
          userId: userIdView(),
          username: userNameView(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(({ body }) => body && dispatchLoadUsersData([body]))
    .mergeMap(() =>
      getRequest('/fetchUsers')
        .query({
          wis: wisView(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(
      ({ body }) =>
        window.W &&
        window.W.getUsersInfo(mapToUsername(body)).then(info => {
          const users = R.values(info)
          dispatchLoadUsersData(users)
        }),
    )
    .ignoreElements()

const initialFetchEpic = action$ =>
  action$
    .ofType(FETCH_TODAY_DATA)
    .do(() => dispatchSetIsLoading(true))
    .do(() => window.W && window.W.start())
    .mergeMap(() =>
      getRequest('/initialFetch')
        .query({
          wis: wisView(),
          userId: userIdView(),
          today: getToday(),
          now: getParsedNow(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(({ body: { logs } }) => dispatchLoadLogsData(logs))
    .do(({ body: { tags } }) => dispatchLoadTagsDataInAdd(tags))
    .do(({ body: { totalDurations } }) =>
      dispatchLoadTotalDurations(totalDurations),
    )
    .do(({ body: { leaderboard } }) =>
      dispatchRestoreLeaderboardData(leaderboard),
    )
    .mergeMap(({ body: { pins } }) =>
      postRequest('/saveLogs')
        .send({
          date: formattedDate(getNow()),
          pins: getUnique(pins),
          userId: userIdView(),
          wis: wisView(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(({ body }) => dispatchLoadLogsData(body))
    .do(() =>
      dispatchAddPage(formattedDate(previousDay(getNow())), selectedUserView()),
    )
    .do(() => dispatchAddPage(formattedDate(getNow()), selectedUserView()))
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

const addLogToNextDayEpic = action$ =>
  action$
    .ofType(ADD_LOG_TO_NEXT_DAY)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ title, tags, isPinned, end, date }) =>
      postRequest('/insertLogToNextDay')
        .send({
          title,
          tags,
          isPinned,
          times: [
            {
              start: previousDay(formatTime('24:00:00')),
              end,
            },
          ],
          date,
          userId: userIdView(),
          wis: wisView(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(({ body }) =>
      pulse(ADD_LOG_TO_NEXT_DAY, {
        body,
        now: getNow(),
        user: selectedUserView(),
      }),
    )
    .do(() => window.W && window.W.analytics('PAUSE_AFTER_24'))
    .ignoreElements()

const addLogToNextDayRealTime = action$ =>
  action$
    .ofType(ADD_LOG_TO_NEXT_DAY_REALTIME)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .do(({ now, user }) => dispatchAddPage(formattedDate(now), user))
    .do(({ body }) => dispatchAddLog(body))
    .do(() => dispatchSetIsLoading(true))
    .ignoreElements()

const effectDeleteLog = action$ =>
  action$
    .ofType(HANDLE_DELETE_LOG)
    .do(() => dispatchSetIsLoading(true))
    .pluck('payload')
    .mergeMap(({ _id }) =>
      postRequest('/deleteLog')
        .query({
          _id,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(({ body }) => pulse(DELETE_LOG, body._id))
    .do(() => dispatchChangeSnackbarStage('Deleted successfully !'))
    .do(() => dispatchChangePopoverId(''))
    .do(() => window.W && window.W.analytics('DELETE_LOG'))
    .ignoreElements()

const effectDeleteLogRealTime = action$ =>
  action$
    .ofType(DELETE_LOG_REALTIME)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .do(dispatchDeleteLog)
    .do(() => dispatchRefetchTotalDuration())
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

const effectSaveStartTime = action$ =>
  action$
    .ofType(HANDLE_SAVE_START_TIME)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .delay(250)
    .mergeMap(({ _id, sumOfTimes }) =>
      postRequest('/saveStartTime')
        .send({
          _id,
          start: getNow(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        )
        .then(res => ({ ...res.body, sumOfTimes })),
    )
    .do(body => pulse(SAVE_START_TIME, body))
    .do(() => window.W && window.W.analytics('PLAY_CLICK'))
    .ignoreElements()

const effectSaveStartTimeRealTime = action$ =>
  action$
    .ofType(SAVE_START_TIME_REALTIME)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .do(({ sumOfTimes }) => dispatchSetSecondsElapsed(sumOfTimes))
    .do(dispatchSaveStartTime)
    .do(({ _id }) => dispatchChangeRunningId(_id))
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

const effectSaveEndTime = action$ =>
  action$
    .ofType(HANDLE_SAVE_END_TIME)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ runningId, end, _id, times }) =>
      postRequest('/saveEndTime')
        .send({
          runningId,
          end,
          _id,
          times,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .pluck('body')
    .do(body => pulse(SAVE_END_TIME, body))
    .do(() => window.W && window.W.analytics('PAUSE_CLICK'))
    .filter(({ _id }) => _id)
    .do(({ _id, times }) => dispatchHandleSaveStartTime(_id, sumTimes(times)))
    .do(() => window.W && window.W.analytics('PLAY_CLICK'))
    .ignoreElements()

const effectSaveEndTimeRealtimeEpic = (action$, { getState }) =>
  action$
    .ofType(SAVE_END_TIME_REALTIME)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .do(() => dispatchSetToday(getTotalDuration(getState())))
    .do(({ runningId, end }) => dispatchSaveEndTime({ _id: runningId, end }))
    .do(dispatchSortOnFrequentlyUsage)
    .do(() => dispatchRefetchTotalDuration())
    .do(() => dispatchChangeRunningId(''))
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

const effectToggleIsPinned = action$ =>
  action$
    .ofType(HANDLE_TOGGLE_IS_PINNED)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, title, tags, value, lastDate }) =>
      postRequest('/toggleIsPinned')
        .send({
          _id,
          title,
          tags,
          value,
          lastDate,
          userId: userIdView(),
          wis: wisView(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(() => dispatchSetIsLoading(false))
    .map(({ body: { _id, value } }) => ({ _id, value }))
    .do(({ _id, value }) => dispatchToggleIsPinned(_id, value))
    .do(
      ({ value }) =>
        value === true && window.W && window.W.analytics('PIN_LOG'),
    )
    .do(
      ({ value }) =>
        value === false && window.W && window.W.analytics('UNPIN_LOG'),
    )
    .filter(({ _id, value }) => value && isUniqueLog(_id))
    .mergeMap(({ _id }) =>
      postRequest('/saveLogs')
        .send({
          date: formattedDate(getNow()),
          pins: [getLog(_id)],
          userId: userIdView(),
          wis: wisView(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(({ body }) => dispatchLoadLogsData(body))
    .ignoreElements()

const changeTabEpic = action$ =>
  action$
    .ofType(CHANGE_TAB)
    .pluck('payload')
    .do(() => aboutModeView() === true && dispatchSetAboutMode(false))
    .do(({ value }) => value === 'Home' && push('/'))
    .do(({ value }) => value !== 'Home' && push(`/${value}`))
    .do(
      ({ value }) =>
        window.W &&
        window.W.analytics('TAB_CLICK', {
          name: value,
        }),
    )
    .ignoreElements()

const setAboutModeEpic = action$ =>
  action$
    .ofType(SET_ABOUT_MODE)
    .do(() => push('/About'))
    .ignoreElements()

export default combineEpics(
  saveUsersEpic,
  initialFetchEpic,
  addLogToNextDayEpic,
  effectDeleteLog,
  effectSaveStartTime,
  effectSaveEndTime,
  effectToggleIsPinned,
  changeTabEpic,
  setAboutModeEpic,
  effectSaveEndTimeRealtimeEpic,
  effectDeleteLogRealTime,
  effectSaveStartTimeRealTime,
  addLogToNextDayRealTime,
)
