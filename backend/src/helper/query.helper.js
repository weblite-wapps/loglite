// modules
import json2csv from "json2csv";
import * as R from "ramda";
import {
  addDays,
  format,
  differenceInDays,
  differenceInSeconds,
} from "date-fns";


const sumTimes = times =>
  R.reduce(
    (acc, time) =>
      time.end === "running"
        ? acc + differenceInSeconds(new Date(), time.start)
        : acc + differenceInSeconds(time.end, time.start),
    0
  )(times);

export const sumLogs = logs =>
  R.reduce((acc, log) => acc + sumTimes(log.times), 0)(logs);


export const defaultQueryGenerator = ({ wis, userId }) => ({
  wis,
  userId
});

export const queryGenerator = query => ({
  wis: query.wis,
  userId: query.userId,
  $and: [{ date: { $gte: query.startDate } }, { date: { $lte: query.endDate } }]
});

const formattedTags = tags =>
  R.slice(1, JSON.stringify(tags).length - 1, JSON.stringify(tags));

export const modifiedQuery = query => {
  if (!query.selectedTags) {
    return {
      ...queryGenerator(query)
    };
  } else if (Array.isArray(query.selectedTags)) {
    return {
      ...queryGenerator(query),
      tags: { $in: query.selectedTags }
    };
  }
  return {
    ...queryGenerator(query),
    tags: query.selectedTags
  };
};

export const getJSON = logs => {
  let formattedData = R.map(
    log =>
      R.dissoc(
        "times",
        R.assoc("duration", formattedSeconds(sumTimes(log.times), "Home"), log)
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

export const getBarChartData = (logs, query) => {
  let dates = Array(
    differenceInDays(new Date(query.endDate), new Date(query.startDate)) + 1
  ).fill(query.startDate);
  dates = dates.map((date, index) =>
    format(addDays(new Date(date), index), "YYYY-MM-DD")
  );
  return R.map(
    date => ({
      name: date,
      duration: Math.floor(
        sumLogs(R.filter(log => log.date === date, logs)) / 60
      )
    }),
    dates
  );
};

export const getLeaderboardData = R.compose(
  R.map(logs => ({
    userId: logs[0].userId,
    score: Math.floor(sumLogs(logs) / 60),
    workInProgress: checkInProgress(logs)
  })),
  R.values,
  R.groupBy(R.prop("userId"))
);

export const checkInProgress = R.compose(
  R.reduce(R.or, false),
  R.map(log => R.findIndex(R.propEq("end", "running"))(log.times) !== -1),
  R.filter(log => log.date === format(new Date(), "YYYY-MM-DD"))
);

export const getRunningTimeId = times =>
  R.reduce(
    (acc, item) => (item.end === "running" ? (acc = item._id) : acc),
    "",
    times
  );

// export const getAnalysisData = (logs, userId) => R.compose(

// )(logs)

// const data = [
//   {
//     "name": "Sat",
//     "userMean": 4000,
//     "wisMean": 2400,
//   },
//   {
//     "name": "Sun",
//     "userMean": 3000,
//     "wisMean": 1398,
//   },
//   {
//     "name": "Mon",
//     "userMean": 2000,
//     "wisMean": 9800,
//   },
// ]
