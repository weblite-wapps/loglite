// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { Observable } from 'rxjs/Observable'
import format from 'date-fns/format'
import startOfWeek from 'date-fns/start_of_week'
import startOfMonth from 'date-fns/start_of_month'
import subDays from 'date-fns/sub_days'
// helpers
import { postRequest } from './Home.helper'
// actions
import { RESET_INPUTS } from '../../Add/Main/Add.action'
import {
  REFETCH_TOTAL_DURATION,
  COUNTINUE_COUNTING,
  loadTodayTotalDuration,
  loadThisWeekTotalDuration,
  loadThisMonthTotalDuration,
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
    .mergeMap(() => Promise.all([
      postRequest('/todayTotalDuration')
        .send({
          wis: wisView,
          userId: userIdView,
          date: format(new Date(), 'YYYY-MM-DD'),
        }),
      postRequest('/thisWeekTotalDurations')
        .send({
          wis: wisView,
          userId: userIdView,
          startDate: subDays(startOfWeek(new Date()), 1),
          endDate: new Date(),
        }),
      postRequest('/thisMonthTotalDurations')
        .send({
          wis: wisView,
          userId: userIdView,
          startDate: startOfMonth(new Date()),
          endDate: new Date(),
        }),
    ]))
    .do(() => dispatchSetIsLoading(false))
    .mergeMap(success => ([
      loadTodayTotalDuration(success[0].text),
      loadThisWeekTotalDuration(success[1].text),
      loadThisMonthTotalDuration(success[2].text),
    ]))

const effectCountUpEpic = action$ =>
  action$.ofType(SAVE_START_TIME, COUNTINUE_COUNTING)
    .pluck('payload')
    .mergeMap(payload => Observable.interval(1000)
      .mapTo({ type: INCREMENT_SECONDS_ELAPSED, payload })
      .takeUntil(action$.ofType(SAVE_END_TIME, CHANGE_TAB)))


export default combineEpics(
  refetchTotalDurationEpic,
  effectCountUpEpic,
)
