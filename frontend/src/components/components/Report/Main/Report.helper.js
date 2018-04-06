// modules
import * as R from 'ramda'
import { differenceInSeconds, addDays, subDays, isAfter } from 'date-fns'
// views
import { startDateView, endDateView } from '../../../components/Report/Main/Report.reducer'


export const isTime = time => R.test(/^Total/, time)

export const previousDay = date => subDays(date, 1)

export const nextDay = date => addDays(date, 1)

export const sumTimes = times =>
  R.reduce((acc, time) => time.end === 'running' ? acc : acc + differenceInSeconds(time.end, time.start), 0)(times)

export const sumLogs = logs =>
  R.reduce((acc, log) => acc + sumTimes(log.times), 0)(logs)

export const formattedSeconds = (seconds) => {
  if (Math.floor(seconds / 3600) === 0) {
    return `Total: ${Math.floor(seconds / 60)}m`
  }
  return Math.floor((seconds % 3600) / 60) === 0 ?
    `Total: ${Math.floor(seconds / 3600)}h` :
    `Total: ${Math.floor(seconds / 3600)}h & ${Math.floor((seconds % 3600) / 60)}m`
}

export const checkBeforeAction = () => {
  const start = startDateView()
  const end = endDateView()

  if (start && end) {
    if (isAfter(new Date(end), new Date(start))) {
      return ({
        message: null,
        isError: { startDate: false, endDate: false },
        permission: true,
      })
    }
    return ({
      message: 'StartDate is after EndDate!',
      isError: { startDate: true, endDate: true },
      permission: false,
    })
  } else if (!start) {
    return ({
      message: 'Select start date!',
      isError: { startDate: true, endDate: false },
      permission: false,
    })
  }
  return ({
    message: 'Select end date!',
    isError: { startDate: false, endDate: true },
    permission: false,
  })
}
