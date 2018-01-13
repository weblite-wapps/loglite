// modules
const R = require('ramda')
var isAfter = require('date-fns/is_after')
var differenceInSeconds = require('date-fns/difference_in_seconds')


const sumTimes = times =>
  R.reduce((acc, time) => time.end === 'running' ? acc : acc + differenceInSeconds(time.end, time.start), 0)(times)

exports.sumTimes = times =>
  R.reduce((acc, time) => time.end === 'running' ? acc : acc + differenceInSeconds(time.end, time.start), 0)(times)

exports.sumLogs = logs =>
  R.reduce((acc, log) => acc + sumTimes(log.times), 0)(logs)

exports.formattedSeconds = (seconds, pageName) => {
  if (pageName === 'Home') {
    if (Math.floor(seconds / 3600) === 0) {
        return `${Math.floor(seconds / 60)}m`
    }
    return Math.floor((seconds % 3600) / 60) === 0 ?
      `${Math.floor(seconds / 3600)}h` :
      `${Math.floor(seconds / 3600)}h${Math.floor((seconds % 3600) / 60)}m`
  } else {
    if (Math.floor(seconds / 3600) === 0) {
      return `Total: ${Math.floor(seconds / 60)}m`
    }
    return Math.floor((seconds % 3600) / 60) === 0 ?
      `Total: ${Math.floor(seconds / 3600)}h` :
      `Total: ${Math.floor(seconds / 3600)}h${Math.floor((seconds % 3600) / 60)}m`
  }
}

exports.formattedTags = tags =>
  R.slice(1, JSON.stringify(tags).length - 1, JSON.stringify(tags))
