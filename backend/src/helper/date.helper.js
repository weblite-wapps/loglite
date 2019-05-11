// modules
import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  subDays,
  format,
} from "date-fns";

export const formattedDate = date => format(date, "YYYY-MM-DD");

export const getYesterday = date => formattedDate(subDays(startOfDay(date), 1));

export const getSixDaysAgo = date =>
  formattedDate(subDays(startOfDay(date), 6));

export const getStartDayOfWeek = date =>
  formattedDate(subDays(startOfWeek(date), 1));

export const getStartDayOfMonth = date => formattedDate(startOfMonth(date));