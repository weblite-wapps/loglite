// modules
import * as R from 'ramda'
import differenceInSeconds from 'date-fns/difference_in_seconds'


export const sumTimes = times =>
  R.reduce((acc, time) => time.end === 'running' ? acc : acc + differenceInSeconds(time.end, time.start), 0)(times)

export const sumLogs = logs =>
  R.reduce((acc, log) => acc + sumTimes(log.times), 0)(logs)

export const formattedSeconds = (seconds, pageName) => {
  if (pageName === 'Home') {
    if (Math.floor(seconds / 3600) === 0) {
      return `${Math.floor(seconds / 60)}m`
    }
    return Math.floor((seconds % 3600) / 60) === 0 ?
      `${Math.floor(seconds / 3600)}h` :
      `${Math.floor(seconds / 3600)}h${Math.floor((seconds % 3600) / 60)}m`
  }
  if (Math.floor(seconds / 3600) === 0) {
    return `Total: ${Math.floor(seconds / 60)}m`
  }
  return Math.floor((seconds % 3600) / 60) === 0 ?
    `Total: ${Math.floor(seconds / 3600)}h` :
    `Total: ${Math.floor(seconds / 3600)}h${Math.floor((seconds % 3600) / 60)}m`
}

export const formattedTags = tags =>
  R.slice(1, JSON.stringify(tags).length - 1, JSON.stringify(tags))
