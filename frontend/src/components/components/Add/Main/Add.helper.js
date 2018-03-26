import * as R from 'ramda'
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

export const areRangesOverlappingForTimes = (times, startOfRange, endOfRange) =>
  R.reduce(R.or, false, R.map(time =>
    areRangesOverlapping(startOfRange, endOfRange, time.start, time.end), times))

export const areTimesOverlapping = (logs, startOfRange, endOfRange) =>
  R.reduce(R.or, false, R.map(log =>
    areRangesOverlappingForTimes(log.times, startOfRange, endOfRange), logs))
