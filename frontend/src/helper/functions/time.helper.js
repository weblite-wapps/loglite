// modules
import * as R from 'ramda'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import setMinutes from 'date-fns/set_minutes'
import setHours from 'date-fns/set_hours'


export const formatTime = time =>
  setHours(setMinutes(new Date(), R.slice(3, 5, time)), R.slice(0, 2, time))

export const sumTimes = times =>
  R.reduce((acc, time) =>
    time.end === 'running' ? acc : acc + differenceInSeconds(time.end, time.start), 0)(times)

export const formattedSeconds = (seconds) => {
  if (Math.floor(seconds / 60) === 0) {
    return `${seconds % 60}s`
  } else if (Math.floor(seconds / 3600) === 0) {
    return seconds % 60 === 0 ?
      `${Math.floor(seconds / 60)}m` :
      `${Math.floor(seconds / 60)}m${seconds % 60}s`
  }
  return seconds % 3600 === 0 ?
    `${Math.floor(seconds / 3600)}h` :
    `${Math.floor(seconds / 3600)}h${Math.floor((seconds % 3600) / 60)}m`
}

export const formattedMinutes = (minutes) => {
  if (Math.floor(minutes / 60) === 0) {
    return `${minutes % 60}m`
  }
  return minutes % 60 === 0 ? `${Math.floor(minutes / 60)}h` : `${Math.floor(minutes / 60)}h${minutes % 60}m`
}
