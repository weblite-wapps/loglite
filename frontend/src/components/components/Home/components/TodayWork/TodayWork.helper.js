// modules
import * as R from 'ramda'
// const
const { format } = new Intl.NumberFormat([], { minimumIntegerDigits: 2 })


export const formattedSeconds = sec =>
  `${format(Math.floor(sec / 3600))}:${format(Math.floor((sec % 3600) / 60))}:${format(sec % 60)}`

export const formattedName = name =>
  name.length > 22 ? `${R.slice(0, 22, name)}...` : name
