// modules
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/mergeMap'
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
  loadTodayTotalDuration,
  loadThisWeekTotalDuration,
  loadThisMonthTotalDuration,
} from './Home.action'


const refetchTotalDurationEpic = (action$, { getState }) =>
  action$.ofType(RESET_INPUTS, REFETCH_TOTAL_DURATION)
    .do(() => dispatch(setIsLoading(true)))
    .mergeMap(() => Promise.all([
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
    .do(() => dispatch(setIsLoading(false)))
    .mergeMap(success => ([
      loadTodayTotalDuration(success[0].text),
      loadThisWeekTotalDuration(success[1].text),
      loadThisMonthTotalDuration(success[2].text),
    ]))


export default combineEpics(
  refetchTotalDurationEpic,
)
