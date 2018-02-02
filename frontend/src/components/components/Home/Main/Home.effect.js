// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { Observable } from 'rxjs/Observable'
// helpers
import { getRequest } from './Home.helper'
import { getToday, getStartDayOfWeek, getStartDayOfMonth } from '../../../../helper/functions/date.helper'
// actions
import { RESET_INPUTS } from '../../Add/Main/Add.action'
import {
  REFETCH_TOTAL_DURATION,
  COUNTINUE_COUNTING,
  loadTotalDurations,
} from './Home.action'
import {
  SAVE_START_TIME,
  INCREMENT_SECONDS_ELAPSED,
  SAVE_END_TIME,
  CHANGE_TAB,
  dispatchSetIsLoading,
} from '../../../Main/App.action'
// views
import { wisView, userIdView } from '../../../Main/App.reducer'


const refetchTotalDurationEpic = action$ =>
  action$.ofType(RESET_INPUTS, REFETCH_TOTAL_DURATION)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/fetchTotalDurations')
      .query({
        wis: wisView(),
        userId: userIdView(),
        today: getToday(),
        startOfWeek: getStartDayOfWeek(),
        startOfMonth: getStartDayOfMonth(),
      }))
    .do(() => dispatchSetIsLoading(false))
    .map(({ body }) => loadTotalDurations(body))


const effectCountUpEpic = action$ =>
  action$.ofType(SAVE_START_TIME, COUNTINUE_COUNTING)
    .pluck('payload')
    .mergeMap(() => Observable.interval(1000)
      .mapTo({ type: INCREMENT_SECONDS_ELAPSED })
      .takeUntil(action$.ofType(SAVE_END_TIME, CHANGE_TAB)))


export default combineEpics(
  refetchTotalDurationEpic,
  effectCountUpEpic,
)
