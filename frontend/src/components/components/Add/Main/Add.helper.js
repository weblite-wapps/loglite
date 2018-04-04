import * as R from 'ramda'
import areRangesOverlapping from 'date-fns/are_ranges_overlapping'


export const areRangesOverlappingForTimes = (times, startOfRange, endOfRange) =>
  R.reduce(R.or, false, R.map(time =>
    areRangesOverlapping(startOfRange, endOfRange, time.start, time.end), times))

export const areTimesOverlapping = (logs, startOfRange, endOfRange) =>
  R.reduce(R.or, false, R.map(log =>
    areRangesOverlappingForTimes(log.times, startOfRange, endOfRange), logs))
