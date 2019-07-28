// modules
import {
  combineEpics, ofType
} from 'redux-observable'
import 'rxjs'
import { tap, mergeMap, ignoreElements, pluck, delay, filter } from 'rxjs/operators'
import *  as R from 'ramda'
// import moment from 'moment-timezone'
import {
  dispatchChangeSnackbarStage
} from '../components/Snackbar/Snackbar.action'
import {
  push
} from '../../setup/redux'
// helpers
import {
  getUnique,
  mapToUsername,
  isUniqueLog,
  getLog,
} from './App.helper'
import {
  getRequest,
  postRequest
} from '../../helper/functions/request.helper'
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
import {
  dispatchLoadTagsDataInAdd
} from '../components/Add/Main/Add.action'
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
} from './App.action'
// views
import {
  wisView,
  userIdView,
  userNameView,
  aboutModeView
} from './App.reducer'
import {
  selectedUserView
} from '../components/Report/Main/Report.reducer'
// selectors
import { getTotalDuration } from '../components/Home/components/Summary/Summary.selector'


const saveUsersEpic = action$ =>
  action$.pipe(
    ofType(FETCH_TODAY_DATA),
    mergeMap(() =>
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
    ),
    tap(({
      body
    }) => body && dispatchLoadUsersData([body])),
    mergeMap(() =>
      getRequest('/fetchUsers')
        .query({
          wis: wisView()
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    ),
    tap(({
      body
    }) =>
      window.W && window.W.getUsersInfo(mapToUsername(body)).then(info => {
        const users = R.values(info)
        dispatchLoadUsersData(users)
      })),
    ignoreElements()
  )




const initialFetchEpic = action$ =>
  action$.pipe(
    ofType(FETCH_TODAY_DATA),
    tap(() => dispatchSetIsLoading(true)),
    tap(() => window.W && window.W.start()),
    mergeMap(() =>
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
    ),
    tap(({
      body: {
        logs
      }
    }) => dispatchLoadLogsData(logs)),
    tap(({
      body: {
        tags
      }
    }) => dispatchLoadTagsDataInAdd(tags)),
    tap(({
      body: {
        totalDurations
      }
    }) =>
      dispatchLoadTotalDurations(totalDurations),
    ),
    tap(({
      body: {
        leaderboard
      }
    }) =>
      dispatchRestoreLeaderboardData(leaderboard),
    ),
    mergeMap(({
      body: {
        pins
      }
    }) =>
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
    ),
    tap(({
      body
    }) => dispatchLoadLogsData(body)),
    tap(() =>
      dispatchAddPage(formattedDate(previousDay(getNow())), selectedUserView()),
    ),
    tap(() => dispatchAddPage(formattedDate(getNow()), selectedUserView())),
    tap(() => dispatchSetIsLoading(false)),
    ignoreElements()
  )



const addLogToNextDayEpic = action$ =>
  action$
    .ofType(ADD_LOG_TO_NEXT_DAY)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({
      title,
      tags,
      isPinned,
      end,
      date
    }) =>
      postRequest('/insertLogToNextDay')
        .send({
          title,
          tags,
          isPinned,
          times: [{
            start: previousDay(formatTime('24:00:00')),
            end
          }],
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
    .do(() => dispatchSetIsLoading(false))
    .do(() => dispatchAddPage(formattedDate(getNow()), selectedUserView()))
    .do(({
      body
    }) => dispatchAddLog(body))
    .do(() => window.W && window.W.analytics('PAUSE_AFTER_24'))
    .ignoreElements()

const effectDeleteLog = action$ =>
  action$
    .ofType(HANDLE_DELETE_LOG)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(action =>
      postRequest('/deleteLog')
        .query({
          _id: action.payload._id
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(() => dispatchSetIsLoading(false))
    .do(({
      body
    }) => dispatchDeleteLog(body._id))
    .do(() => dispatchChangeSnackbarStage('Deleted successfully !'))
    .do(() => dispatchChangePopoverId(''))
    .do(() => dispatchRefetchTotalDuration())
    .do(() => window.W && window.W.analytics('DELETE_LOG'))
    .ignoreElements()

const effectSaveStartTime = action$ =>
  action$.pipe(
    ofType(HANDLE_SAVE_START_TIME),
    pluck('payload'),
    tap(() => dispatchSetIsLoading(true)),
    delay(250),
    mergeMap(({
      _id
    }) =>
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
        ),
    ),
    tap(() => dispatchSetIsLoading(false)),
    tap(({
      body: {
        _id,
        start,
        runningTimeId
      }
    }) =>
      dispatchSaveStartTime(_id, start, runningTimeId),
    ),
    tap(({
      body: {
        _id
      }
    }) => dispatchChangeRunningId(_id)),
    tap(() => window.W && window.W.analytics('PLAY_CLICK')),
    ignoreElements(),
  )


const effectSaveEndTime = (action$, { value }) =>
  action$.pipe(
    ofType(HANDLE_SAVE_END_TIME),
    pluck('payload'),
    tap(() => dispatchSetIsLoading(true)),
    mergeMap(({
      runningId,
      end,
      _id,
      times
    }) =>
      postRequest('/saveEndTime')
        .send({
          runningId,
          end,
          _id,
          times
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    ),
    tap(() => dispatchSetIsLoading(false)),
    tap(() => dispatchSetToday(getTotalDuration(value))),
    tap(({
      body: {
        runningId,
        end
      }
    }) => dispatchSaveEndTime(runningId, end)),
    tap(() => window.W && window.W.analytics('PAUSE_CLICK')),
    tap(dispatchRefetchTotalDuration),
    tap(() => dispatchChangeRunningId('')),
    filter(({ body: { _id } }) => _id),
    tap(({
      body: {
        times
      }
    }) => dispatchSetSecondsElapsed(sumTimes(times))),
    tap(({
      body: {
        _id,
      }
    }) => dispatchHandleSaveStartTime(_id)),
    tap(() => window.W && window.W.analytics('PLAY_CLICK')),
    ignoreElements()
  )


const effectToggleIsPinned = action$ =>
  action$
    .ofType(HANDLE_TOGGLE_IS_PINNED)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({
      _id,
      title,
      tags,
      value,
      lastDate,
    }) =>
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
    .do(({ value }) => value === true && window.W && window.W.analytics('PIN_LOG'))
    .do(({ value }) => value === false && window.W && window.W.analytics('UNPIN_LOG'))
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
    .do(({
      body
    }) => dispatchLoadLogsData(body))
    .ignoreElements()

const changeTabEpic = action$ =>
  action$.pipe(

  )
    .ofType(CHANGE_TAB)
    .pluck('payload')
    .do(() => aboutModeView() === true && dispatchSetAboutMode(false))
    .do(({
      value
    }) => value === 'Home' && push('/'))
    .do(({
      value
    }) => value !== 'Home' && push(`/${value}`))
    .do(({
      value
    }) => window.W && window.W.analytics('TAB_CLICK', {
      name: value
    }))
    .ignoreElements()

const setAboutModeEpic = action$ =>
  action$.pipe(
    ofType(SET_ABOUT_MODE),
    tap(() => push('/About')),
    ignoreElements()
  )

export default combineEpics(
  saveUsersEpic,
  initialFetchEpic,
  // addLogToNextDayEpic,
  // effectDeleteLog,
  effectSaveStartTime,
  effectSaveEndTime,
  // effectToggleIsPinned,
  changeTabEpic,
  setAboutModeEpic,
)