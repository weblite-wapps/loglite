// modules
import { startOfWeek, startOfMonth, addDays, subDays, format } from 'date-fns'


export const formattedDate = date => format(date, 'YYYY-MM-DD')

export const previousDay = date => subDays(date, 1)

export const nextDay = date => addDays(date, 1)

export const startDayOfWeek = date => subDays(startOfWeek(date), 1)

export const startDayOfMonth = date => startOfMonth(date)
