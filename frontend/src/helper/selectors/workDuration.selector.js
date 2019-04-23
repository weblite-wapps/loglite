// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
// helpers
import { sumTimes, formattedSeconds } from '../functions/time.helper'

const getLogs = state => state.App.logs
const getStaffLogs = state => state.Report.staffLogs 

const getWorksDuration = createSelector(
  [getLogs],
  R.reduce((acc, log) => R.assoc(log._id, formattedSeconds(sumTimes(log.times)), acc), {}),
)

const getStaffWorksDuration = createSelector(
  [getStaffLogs],
  R.reduce((acc, log) => R.assoc(log._id, formattedSeconds(sumTimes(log.times)), acc), {}),
)


export { getWorksDuration, getStaffWorksDuration }
