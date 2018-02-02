// modules
import { startOfWeek, startOfMonth, addDays, subDays, format } from 'date-fns'


export const formattedDate = date => format(date, 'YYYY-MM-DD')

export const previousDay = date => subDays(date, 1)

export const nextDay = date => addDays(date, 1)

export const getToday = () => formattedDate(new Date())

export const getStartDayOfWeek = () => formattedDate(subDays(startOfWeek(new Date()), 1))

export const getStartDayOfMonth = () => formattedDate(startOfMonth(new Date()))
