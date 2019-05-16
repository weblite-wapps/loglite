// modules
import * as R from "ramda";
import moment from 'moment-timezone'
import {
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";


export const formattedSeconds = (seconds, pageName) => {
  if (pageName === "Home") {
    if (Math.floor(seconds / 3600) === 0) {
      return `${Math.floor(seconds / 60)}m`;
    }
    return Math.floor((seconds % 3600) / 60) === 0
      ? `${Math.floor(seconds / 3600)}h`
      : `${Math.floor(seconds / 3600)}h & ${Math.floor(
          (seconds % 3600) / 60
        )}m`;
  }
  if (Math.floor(seconds / 3600) === 0) {
    return `Total: ${Math.floor(seconds / 60)}m`;
  }
  return Math.floor((seconds % 3600) / 60) === 0
    ? `Total: ${Math.floor(seconds / 3600)}h`
    : `Total: ${Math.floor(seconds / 3600)}h & ${Math.floor(
        (seconds % 3600) / 60
      )}m`;
};

export const formatTime = time =>
  setHours(
    setMinutes(
      setSeconds(getNow(), R.slice(6, 8, time)),
      R.slice(3, 5, time),
    ),
    R.slice(0, 2, time),
  )

  export const getNow = () => new Date(moment().tz('Asia/Tehran').format())
