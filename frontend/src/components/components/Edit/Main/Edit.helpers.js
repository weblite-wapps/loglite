// modules
import * as R from 'ramda'
import { areRangesOverlapping, isAfter, differenceInSeconds } from 'date-fns'
// helpers
import {
  formatTime,
  getNow,
  getTimeZone,
} from '../../../../helper/functions/time.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
// views
import { logsView } from '../../../Main/App.reducer'

export const areRangesOverlappingForTimes = (
  title,
  times,
  startOfRange,
  endOfRange,
) => {
  console.log('in areRangesOverlappingForTimes')
  console.log('startOfRange ', startOfRange)
  console.log('endOfRange ', endOfRange)
  console.log('title ', title)
  console.log('times ', times)
  return R.reduce(
    R.or,
    false,
    R.map(time => {
      if (differenceInSeconds(startOfRange, new Date(time.end)) > -60)
        return false
      console.log('time.start: ', new Date(time.start))
      console.log('time.end: ', new Date(time.end))
      return areRangesOverlapping(
        startOfRange,
        endOfRange,
        new Date(time.start),
        new Date(time.end),
      )
    }, times),
  )
}
export const areTimesOverlapping = (logs, startOfRange, endOfRange) => {
  console.log('in areTimesOverlapping')
  return R.reduce(
    R.or,
    false,
    R.map(
      log =>
        areRangesOverlappingForTimes(
          log.title,
          log.times,
          startOfRange,
          endOfRange,
        ),
      logs,
    ),
  )
}

const getObject = (trueOption, message, permission) => {
  const isError = {
    title: false,
    date: false,
    startTime: false,
    endTime: false,
  }
  return trueOption
    ? { isError: R.assoc(trueOption, true, isError), message, permission }
    : { isError, message, permission }
}

export const checkBeforeAddLog = ({ title, quickMode = false }) => {
  if (quickMode || title) {
    return getObject('', 'Added successfully!', true)
  }
  return getObject('title', 'Enter title first!', false)
}

export const checkBeforeEditLog = ({ times, log, log: { _id } }) => {
  const logId = _id
  const logs = R.filter(({ _id }) => _id !== logId, logsView())
  const now = getNow()
  const filterEnd = end => (end === 'running' ? now : formatTime(end))
  return R.reduce(
    (acc, { date, start, end }) => {
      if (date && start && end) {
        console.log('date && start && end ', date, start, end)
        if (isAfter(getTimeZone(date), now)) {
          return getObject('date', 'Are you predictor?!', false)
        } else if (
          date === formattedDate(now) &&
          isAfter(formatTime(start), now)
        ) {
          return getObject('startTime', 'Are you predictor?!', false)
        } else if (
          date === formattedDate(now) &&
          isAfter(formatTime(end), now)
        ) {
          return getObject('endTime', 'Are you predictor?!', false)
        } else if (
          isAfter(formatTime(end), formatTime(start)) ||
          end === 'running'
        ) {
          console.log('hello')
          if (
            areTimesOverlapping(
              R.filter(eachLog => eachLog.date === date, logs),
              formatTime(start),
              filterEnd(end),
            )
          ) {
            return getObject(
              'endTime',
              'Time is overlapping with other logs!',
              false,
            )
          }
        }
      } else if (!date) {
        return getObject('date', 'Please enter date!', false)
      } else if (!start) {
        return getObject('startTime', 'Please enter start time!', false)
      } else {
        return getObject('endTime', 'Please enter end time!', false)
      }
      return acc
    },
    getObject('', 'Added successfully!', true),
    times,
  )
}
