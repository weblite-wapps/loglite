// components
import * as R from 'ramda'
import request from 'superagent'
import differenceInSeconds from 'date-fns/difference_in_seconds'
// components
import host from '../../../../setup/config'
// helpers
import { sumTimes } from '../../../../helper/functions/time.helper'

const timesLens = R.lensProp('times')
export const getTimes = (logs, _id) => R.view(timesLens, R.find(R.propEq('_id', _id))(logs))

const startLens = R.lensProp('start')
export const getStartTime = times => R.view(startLens, times[R.length(times) - 1])

export const getRequest = path => request
  .get(host + path)
  .set('Access-Control-Allow-Origin', '*')

export const NextTextSliderName = (currentStage, direction) => {
  switch (currentStage) {
    case 'Today': return 'This Week'
    case 'This Week': return (direction === 'Next') ? 'This Month' : 'Today'
    case 'This Month': return 'This Week'
    default: return null
  }
}

// TODO: refactor me
export const NextTextSliderDuration = (currentStage, direction) => {
  switch (currentStage) {
    case 'Today': return 'thisWeek'
    case 'This Week': return (direction === 'Next') ? 'thisMonth' : 'today'
    case 'This Month': return 'thisWeek'
    default: return null
  }
}

export const getSecondsElapsed = (logs, _id) =>
  sumTimes(getTimes(logs, _id)) + differenceInSeconds(new Date(), getStartTime(getTimes(logs, _id)))
