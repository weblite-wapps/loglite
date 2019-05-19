// modules
import * as R from 'ramda'
import moment from 'moment-timezone'
import {
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  setSeconds,
  differenceInSeconds,
} from 'date-fns'


export const getTimeZone = time => new Date(moment(time).tz('Asia/Tehran').format())

export const getNow = () => new Date(moment().tz('Asia/Tehran').format())

export const getParsedNow = () => moment().tz('Asia/Tehran').format()

export const formatTime = time =>
  setHours(
    setMinutes(
      setSeconds(getNow(), R.slice(6, 8, time)),
      R.slice(3, 5, time),
    ),
    R.slice(0, 2, time),
  )

export const sumTimes = times =>
  R.reduce(
    (acc, { start, end }) =>
      end === 'running' ? acc : acc + differenceInSeconds(end, start),
    0,
  )(times)

export const formattedSeconds = seconds => {
  if (Math.floor(seconds / 60) === 0) {
    return `${seconds % 60}s`
  } else if (Math.floor(seconds / 3600) === 0) {
    return seconds % 60 === 0
      ? `${Math.floor(seconds / 60)}m`
      : `${Math.floor(seconds / 60)}m${seconds % 60}s`
  }
  return Math.floor(seconds % 3600 === 0)
    ? `${Math.floor(seconds / 3600)}h`
    : `${Math.floor(seconds / 3600)}h${Math.floor((seconds % 3600) / 60)}m`
}

export const formattedMinutes = minutes => {
  if (Math.floor(minutes / 60) === 0) {
    return `${minutes % 60}m`
  }
  return minutes % 60 === 0
    ? `${Math.floor(minutes / 60)}h`
    : `${Math.floor(minutes / 60)}h${minutes % 60}m`
} 

export const getCurrentTime = time =>
  `${getHours(time) > 9 ? getHours(time) : '0' + getHours(time)}:${
    getMinutes(time) > 9 ? getMinutes(time) : '0' + getMinutes(time)
  }`

export const checkEditTimesOrder = times =>
  R.prop(
    'val',
    R.reduce(
      (acc, item) =>
        item.start > item.end || item.start < acc.lastData
          ? {
              val: false,
              lastData: acc.lastData,
            }
          : {
              lastData: item.end,
              val: acc.val,
            },
      { val: true, lastData: '' },
      times,
    ),
  )
