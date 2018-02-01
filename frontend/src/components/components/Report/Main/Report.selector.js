// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
// helpers
import { sumTimes, sumLogs, formattedSeconds } from './Report.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'

const getLogs = state => state.App.logs
const getStaffLogs = state => state.Report.staffLogs
const getCurrentPage = state => state.Report.currentPage

const getTotalDuration = createSelector(
  [getLogs, getCurrentPage],
  (logs, currentPage) =>
    formattedSeconds(
      R.compose(sumLogs, R.filter(log => log.date === formattedDate(currentPage)))(logs)),
)

const getStaffTotalDuration = createSelector(
  [getStaffLogs, getCurrentPage],
  (logs, currentPage) =>
    formattedSeconds(
      R.compose(sumLogs, R.filter(log => log.date === formattedDate(currentPage)))(logs)),
)

const getPieChartData = createSelector(
  [getLogs, getCurrentPage],
  (logs, currentPage) => R.compose(
    R.map(log => ({ name: log.title, value: sumTimes(log.times) })),
    R.filter(log => log.date === formattedDate(currentPage)),
  )(logs),
)

const getStaffPieChartData = createSelector(
  [getStaffLogs, getCurrentPage],
  (logs, currentPage) => R.compose(
    R.map(log => ({ name: log.title, value: sumTimes(log.times) })),
    R.filter(log => log.date === formattedDate(currentPage)),
  )(logs),
)

export { getTotalDuration, getStaffTotalDuration, getPieChartData, getStaffPieChartData }
