// modules
import { addDays, subDays, format } from 'date-fns'
// helpers
import { getNow } from './time.helper'

export const formattedDate = date => format(date, 'YYYY-MM-DD')

export const previousDay = date => subDays(date, 1)

export const nextDay = date => addDays(date, 1)

export const getToday = () => formattedDate(getNow())
