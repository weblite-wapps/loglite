// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
import format from 'date-fns/format'
// helpers
import { sumTimes, sumLogs, formattedSeconds } from './Report.helper'

const getLogs = state => state.App.logs
const getCurrentPage = state => state.Report.currentPage


const getTotalDuration = createSelector(
  [getLogs, getCurrentPage],
  (logs, currentPage) =>
    formattedSeconds(R.compose(sumLogs, R.filter(log => log.date === format(currentPage, 'YYYY-MM-DD')))(logs)),
)

const getPieChartData = createSelector(
  [getLogs, getCurrentPage],
  (logs, currentPage) => R.compose(
    R.map(log => ({ name: log.title, value: sumTimes(log.times) })),
    R.filter(log => log.date === format(currentPage, 'YYYY-MM-DD')),
  )(logs),
)

export { getTotalDuration, getPieChartData }
