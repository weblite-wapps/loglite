// modules
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/delay'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/interval'
import format from 'date-fns/format'
import startOfWeek from 'date-fns/start_of_week'
import startOfMonth from 'date-fns/start_of_month'
import subDays from 'date-fns/sub_days'
// helpers
import { postRequest } from './Home.helper'
// actions
import {
  SAVE_START_TIME,
  INCREMENT_SECONDS_ELAPSED,
  SAVE_END_TIME,
  CHANGE_TAB,
  setIsLoading,
} from '../../../Main/App.action'
import { RESET_INPUTS } from '../../Add/Main/Add.action'
import {
  REFETCH_TOTAL_DURATION,
  COUNTINUE_COUNTING,
  loadTodayTotalDuration,
  loadThisWeekTotalDuration,
  loadThisMonthTotalDuration,
} from './Home.action'


const refetchTotalDurationEpic = (action$, { getState, dispatch }) =>
  action$.ofType(RESET_INPUTS, REFETCH_TOTAL_DURATION)
    .do(() => dispatch(setIsLoading(true)))
    .mergeMap(() => Promise.all([
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
    ]))
    .do(() => dispatch(setIsLoading(false)))
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
