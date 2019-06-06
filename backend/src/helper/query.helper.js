// modules
import json2csv from "json2csv";
import * as R from "ramda";
import {
  addDays,
  format,
  differenceInDays,
  differenceInSeconds,
} from "date-fns";
// helpers
import { formattedSeconds, getTimeZone } from './time.helper'

const sumTimes = times =>
  R.reduce(
    (acc, time) =>
      time.end === "running"
        ? acc
        : acc + differenceInSeconds(time.end, time.start),
    0
  )(times);

export const sumLogs = logs => R.reduce((acc, log) => acc + sumTimes(log.times), 0)(logs)

const dynamicSumTimes = (times, now) =>
  R.reduce(
    (acc, time) =>
      time.end === "running"
        ? acc + differenceInSeconds(now, time.start)
        : acc + differenceInSeconds(time.end, time.start),
    0
  )(times);


export const dynamicSumLogs = (logs, now) =>
  R.reduce((acc, log) => acc + dynamicSumTimes(log.times, now), 0)(logs)

export const queryGenerator = ({ wis, userId, startDate, endDate }) => ({
  wis, userId,
  $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }]
});
 
const formattedTags = tags =>
  R.slice(1, JSON.stringify(tags).length - 1, JSON.stringify(tags));

export const modifiedQuery = ({ selectedTags, ...other }) => {
  if (!selectedTags) {
    return {
      ...queryGenerator(other)
    };
  } else if (Array.isArray(selectedTags)) {
    return {
      ...queryGenerator(other),
      tags: { $in: selectedTags }
    };
  }
  return {
    ...queryGenerator(other),
    tags: selectedTags
  };
};

export const getJSON = (logs, now) => {
  let formattedData = R.map(
    log =>
      R.dissoc(
        "times",
        R.assoc("duration", formattedSeconds(dynamicSumTimes(log.times, now), "Home"), log)
      ),
    logs
  );
  const tagsLens = R.lensProp("tags");
  formattedData = R.map(
    log => R.set(tagsLens, formattedTags(log.tags), log),
    formattedData
  );
  const fields = ["title", "tags", "duration", "date"];
  return json2csv({ data: formattedData, fields });
};

export const getBarChartData = (logs, { startDate, endDate, now } ) => {
  let dates = Array( 
    differenceInDays(getTimeZone(endDate), getTimeZone(startDate)) + 1
  ).fill(startDate);
  dates = dates.map((date, index) =>
    format(addDays(getTimeZone(date), index), "YYYY-MM-DD")
  );
  return R.map(
    date => ({
      name: date,
      duration: Math.floor(
        dynamicSumLogs(R.filter(log => log.date === date, logs), now) / 60
      )
    }),
    dates
  );
};

export const getLeaderboardData = (logs, now) => R.compose(
  R.map(logs => ({
    userId: logs[0].userId,
    score: Math.floor(dynamicSumLogs(logs, now) / 60),
    workInProgress: checkInProgress(logs, now)
  })),
  R.values,
  R.groupBy(R.prop("userId"))
)(logs)

export const checkInProgress = (logs, now) => R.compose(
  R.reduce(R.or, false),
  R.map(log => R.findIndex(R.propEq("end", "running"))(log.times) !== -1),
  R.filter(log => log.date === format(now, "YYYY-MM-DD"))
)(logs)

export const getRunningTimeId = times =>
  R.reduce(
    (acc, item) => (item.end === "running" ? (acc = item._id) : acc),
    "",
    times
  );