import * as R from 'ramda'
import setMinutes from 'date-fns/set_minutes'
import setHours from 'date-fns/set_hours'
import areRangesOverlapping from 'date-fns/are_ranges_overlapping'
// components
import host from '../../../../setup/config'
// const
const request = require('superagent')

export const getRequest = path => request
  .get(host + path)
  .set('Access-Control-Allow-Origin', '*')

export const postRequest = path => request
  .post(host + path)
  .set('Access-Control-Allow-Origin', '*')

export const formatTime = time =>
  setHours(setMinutes(new Date(), R.slice(3, 5, time)), R.slice(0, 2, time))

export const areRangesOverlappingForTimes = (times, startOfRange, endOfRange) =>
  R.reduce(R.or, false, R.map(time =>
    areRangesOverlapping(startOfRange, endOfRange, time.start, time.end), times))

export const areTimesOverlapping = (logs, startOfRange, endOfRange) =>
  R.reduce(R.or, false, R.map(log =>
    areRangesOverlappingForTimes(log.times, startOfRange, endOfRange), logs))

export const styles = theme => ({
  container: {
    margin: '20px 10px 20px 10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
