// modules
import { combineEpics, ofType } from 'redux-observable'
import 'rxjs'
import { interval } from 'rxjs'
// local modules
import { dispatchChangeSnackbarStage } from '../../Snackbar/Snackbar.action'
// helpers
import { getRequest } from '../../../../helper/functions/request.helper'
import { getSecondsElapsed } from './Home.helper'
import { getToday } from '../../../../helper/functions/date.helper'
// actions
import {
  SAVE_START_TIME,
  SAVE_END_TIME,
  CHANGE_TAB,
  dispatchSetIsLoading,
} from '../../../Main/App.action'
import { RESET_INPUTS } from '../../Add/Main/Add.action'
import {
  CHANGE_SELECTED_USER,
  PREVIOUS_PAGE,
} from '../../Report/Main/Report.action'
import {
  REFETCH_TOTAL_DURATION,
  COUNTINUE_COUNTING,
  CHECK_TO_SET_SECONDS_ELAPSED,
  dispatchIncrementSecondsElapsed,
  dispatchLoadTotalDurations,
  dispatchSetSecondsElapsed,
} from './Home.action'
// views
import { wisView, userIdView, logsView } from '../../../Main/App.reducer'
import { runningIdView } from '../../Home/Main/Home.reducer'
import { getParsedNow } from '../../../../helper/functions/time.helper'
import {
  filter,
  tap,
  ignoreElements,
  mergeMap,
  takeUntil,
} from 'rxjs/operators'

const refetchTotalDurationEpic = action$ =>
  action$.pipe(
    ofType(RESET_INPUTS, REFETCH_TOTAL_DURATION),
    tap(() => dispatchSetIsLoading(true)),
    mergeMap(() =>
      getRequest('/fetchTotalDurations')
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
    tap(() => dispatchSetIsLoading(false)),
    tap(({ body }) => dispatchLoadTotalDurations(body)),
    ignoreElements(),
  )

const effectCountUpEpic = action$ =>
  action$.pipe(
    ofType(SAVE_START_TIME, COUNTINUE_COUNTING),
    mergeMap(() =>
      interval(1000).pipe(
        tap(dispatchIncrementSecondsElapsed),
        takeUntil(
          action$.pipe(
            ofType(
              SAVE_END_TIME,
              CHANGE_TAB,
              CHANGE_SELECTED_USER,
              PREVIOUS_PAGE,
            ),
          ),
        ),
        ignoreElements(),
      ),
    ),
  )

const effectSetSecondsElapsed = action$ =>
  action$.pipe(
    ofType(CHECK_TO_SET_SECONDS_ELAPSED),
    filter(runningIdView),
    tap(() =>
      dispatchSetSecondsElapsed(getSecondsElapsed(logsView(), runningIdView())),
    ),
    ignoreElements(),
  )

export default combineEpics(
  refetchTotalDurationEpic,
  effectCountUpEpic,
  effectSetSecondsElapsed,
)
