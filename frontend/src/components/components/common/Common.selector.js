// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
// helpers
import { sumTimes, formattedSeconds } from './Common.helper'

const getLogs = state => state.App.logs

const getWorksDuration = createSelector(
  [getLogs],
  logs => R.map(log => ({ _id: log._id, duration: formattedSeconds(sumTimes(log.times)) }), logs),
)


export { getLogs, getWorksDuration }
