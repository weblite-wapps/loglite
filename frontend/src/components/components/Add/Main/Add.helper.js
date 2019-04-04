// modules
import * as R from 'ramda'
import { areRangesOverlapping, isAfter } from 'date-fns'
// helpers
import { formatTime } from '../../../../helper/functions/time.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
// views
import { titleView, startTimeView, endTimeView, dateView } from './Add.reducer'
import { logsView } from '../../../Main/App.reducer'


export const areRangesOverlappingForTimes = (times, startOfRange, endOfRange) =>
  R.reduce(R.or, false, R.map(time =>
    areRangesOverlapping(startOfRange, endOfRange, time.start, time.end), times))


export const areTimesOverlapping = (logs, startOfRange, endOfRange) =>
  R.reduce(R.or, false, R.map(log =>
    areRangesOverlappingForTimes(log.times, startOfRange, endOfRange), logs))


const getObject = (trueOption, message, permission) => {
  const isError = { title: false, date: false, startTime: false, endTime: false }
  return trueOption ? ({ isError: R.assoc(trueOption, true, isError), message, permission }) :
    ({ isError, message, permission })
}


export const checkBeforeAddLog = (quickMode = false) => {
  if (quickMode || titleView()) {
    return getObject('', 'Added successfully!', true)
  }
  return getObject('title', 'Enter title first!', false)
}


export const checkBeforeAddCustomLog = () => {
  const title = titleView()
  const date = dateView()
  const start = startTimeView()
  const end = endTimeView()
  const logs = logsView()

  if (title && date && start && end) {
    if (isAfter(new Date(date), new Date())) {
      return getObject('date', 'Are you predictor?!', false)
    } else if (date === formattedDate(new Date()) &&
      isAfter(formatTime(start), new Date())) {
      return getObject('startTime', 'Are you predictor?!', false)
    } else if (date === formattedDate(new Date()) &&
      isAfter(formatTime(end), new Date())) {
      return getObject('endTime', 'Are you predictor?!', false)
    } else if (isAfter(formatTime(end), formatTime(start))) {
      if (areTimesOverlapping(
        R.filter(eachLog => (eachLog.date === date), logs),
        formatTime(start), formatTime(end))) {
        return getObject('endTime', 'Time is overlapping!', false)
      }
      return getObject('', 'Added successfully!', true)
    }
    return getObject('startTime', 'StartTime is after EndTime!', false)
  } else if (!title) {
    return getObject('title', 'Please enter title!', false)
  } else if (!date) {
    return getObject('date', 'Please enter date!', false)
  } else if (!start) {
    return getObject('startTime', 'Please enter start time!', false)
  }
  return getObject('endTime', 'Please enter end time!', false)
}
