// modules
import format from 'date-fns/format'
import addDays from 'date-fns/add_days'
import subDays from 'date-fns/sub_days'


export const formattedDate = date => format(date, 'YYYY-MM-DD')

export const previousDay = date => subDays(date, 1)

export const nextDay = date => addDays(date, 1)
