// modules
import * as R from 'ramda'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import addDays from 'date-fns/add_days'
import subDays from 'date-fns/sub_days'
// components
import host from '../../../../setup/config'
// const
const request = require('superagent')

export const isTime = time => R.test(/^Total/, time)

export const getRequest = path => request
  .get(host + path)
  .set('Access-Control-Allow-Origin', '*')

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

export const styles = Muitheme => ({
  container: {
    margin: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: Muitheme.spacing.unit,
    marginRight: Muitheme.spacing.unit,
    width: 300,
  },
  textFieldFormLabel: {
    color: '#919191',
  },
  textFieldInkbar: {
    '&:after': {
      backgroundColor: '#919191',
    },
  },
})
