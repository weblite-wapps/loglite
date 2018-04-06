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

export const checkBeforeAddLog = () => {
  if (titleView()) {
    return ({
      isError: { title: false, date: false, startTime: false, endTime: false },
      message: 'Added successfully!',
      permission: true,
    })
  }
  return ({
    isError: { title: true, date: false, startTime: false, endTime: false },
    message: 'Enter title first!',
    permission: false,
  })
}

export const checkBeforeAddCustomLog = () => {
  const title = titleView()
  const date = dateView()
  const start = startTimeView()
  const end = endTimeView()
  const logs = logsView()

  if (title && date && start && end) {
    if (isAfter(new Date(date), new Date())) {
      return ({
        isError: { title: false, date: true, startTime: false, endTime: false },
        message: 'Are you predictor?!',
        permission: false,
      })
    } else if (date === formattedDate(new Date()) &&
      isAfter(formatTime(start), new Date())) {
      return ({
        isError: { title: false, date: false, startTime: true, endTime: false },
        message: 'Are you predictor?!',
        permission: false,
      })
    } else if (date === formattedDate(new Date()) &&
      isAfter(formatTime(end), new Date())) {
      return ({
        isError: { title: false, date: false, startTime: false, endTime: true },
        message: 'Are you predictor?!',
        permission: false,
      })
    } else if (isAfter(formatTime(end), formatTime(start))) {
      if (areTimesOverlapping(
        R.filter(eachLog => (eachLog.date === date), logs),
        formatTime(start), formatTime(end))) {
        return ({
          isError: { title: false, date: false, startTime: true, endTime: true },
          message: 'Time is overlapping!',
          permission: false,
        })
      }
      return ({
        isError: { title: false, date: false, startTime: false, endTime: false },
        message: 'Added successfully!',
        permission: true,
      })
    }
    return ({
      isError: { title: false, date: false, startTime: true, endTime: true },
      message: 'StartTime is after EndTime!',
      permission: false,
    })
  } else if (!title) {
    return ({
      isError: { title: true, date: false, startTime: false, endTime: false },
      message: 'Please enter title!',
      permission: false,
    })
  } else if (!date) {
    return ({
      isError: { title: false, date: true, startTime: false, endTime: false },
      message: 'Please enter date!',
      permission: false,
    })
  } else if (!start) {
    return ({
      isError: { title: false, date: false, startTime: true, endTime: false },
      message: 'Please enter start time!',
      permission: false,
    })
  }
  return ({
    isError: { title: false, date: false, startTime: false, endTime: true },
    message: 'Please enter end time!',
    permission: false,
  })
}

// TODO: از این آبجکت‌ها میشه فاکتور گرفت و یه هلپر ساخت واسشون
