// modules
import * as R from 'ramda'
import subDays from 'date-fns/sub_days'
import setMinutes from 'date-fns/set_minutes'
import setHours from 'date-fns/set_hours'
import differenceInSeconds from 'date-fns/difference_in_seconds'
// const
const { format } = new Intl.NumberFormat([], { minimumIntegerDigits: 2 })


export const previousDay = date => subDays(date, 1)

export const sumTimes = times =>
  R.reduce((acc, time) =>
    time.end === 'running' ? acc : acc + differenceInSeconds(time.end, time.start), 0)(times)

export const formattedSeconds = sec =>
  `${format(Math.floor(sec / 3600))}:${format(Math.floor((sec % 3600) / 60))}:${format(sec % 60)}`

export const formatTime = time =>
  setHours(setMinutes(new Date(), R.slice(3, 5, time)), R.slice(0, 2, time))

export const formattedName = name =>
  name.length > 25 ? `${R.slice(0, 25, name)}...` : name
