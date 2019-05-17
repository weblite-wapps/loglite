// components
import * as R from 'ramda'
import differenceInSeconds from 'date-fns/difference_in_seconds'
// helpers
import { sumTimes, getNow } from '../../../../helper/functions/time.helper'
import { formattedDate } from "../../../../helper/functions/date.helper"


const timesLens = R.lensProp('times')
export const getTimes = (logs, _id) => R.view(timesLens, R.find(R.propEq('_id', _id))(logs))

const startLens = R.lensProp('start')
export const getStartTime = times => R.view(startLens, times[R.length(times) - 1])

export const NextName = (currentStage, direction) => {
  switch (currentStage) {
    case 'Today': return 'This Week'
    case 'This Week': return (direction === 'Next') ? 'This Month' : 'Today'
    case 'This Month': return 'This Week'
    default: return 'Today'
  }
}

export const NextDuration = (currentStage, direction) => {
  switch (currentStage) {
    case 'Today': return 'thisWeek'
    case 'This Week': return (direction === 'Next') ? 'thisMonth' : 'today'
    case 'This Month': return 'thisWeek'
    default: return 'today'
  }
}

export const getSecondsElapsed = (logs, _id) => {
  const times = getTimes(logs, _id)
  const startTime = getStartTime(times)

  return sumTimes(times) + differenceInSeconds(getNow(), startTime)
}

const checkIsRunning = log => R.prop('end', R.last(log.times)) === 'running'

export const checkToShowInHome = log => log.date === formattedDate(getNow()) || checkIsRunning(log) 