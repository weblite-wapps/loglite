// modules
import mongoose from "mongoose";
import * as R from "ramda";
// components
import app from "../../../setup/server";
// db helpers
import { fetchLogs, saveLog, deleteLog, saveTime, updateLog } from "./db";
// helpers
import { dynamicSumLogs, sumLogs, modifiedQuery, getBarChartData, getJSON, getLeaderboardData, getRunningTimeId } from '../../../helper/query.helper'
import { getStartDayOfWeek, getStartDayOfMonth } from '../../../helper/date.helper'
import { formattedSeconds, getNow } from '../../../helper/time.helper'
// const 
const logger = console.log;

app.get("/fetchLogs", ({ query: { wis, userId, date } }, res) =>
  fetchLogs({ wis, userId, date })
    .then(logs => res.json(R.reverse(logs)))
    .catch(logger)
);

app.post("/saveLog", (req, res) =>
    saveLog({ ...req.body, created_at: getNow() })
      .then(log => res.send(log))
      .catch(logger))

app.post("/saveCustomLog", (req, res) =>
  saveLog({ ...req.body, created_at: getNow() })
    .then(log => res.send(log))
    .catch(logger)
);

app.post("/insertLogToNextDay", (req, res) =>
  saveLog({ ...req.body, created_at: getNow() })
    .then(log => res.send(log))
    .catch(logger)
);

app.post("/deleteLog", ({ query }, res) =>
  deleteLog({ _id: mongoose.Types.ObjectId(query._id) })
    .then(() => res.send(query))
    .catch(logger)
); 

app.post("/saveStartTime", ({ body }, res) =>
  saveTime(
    { _id: mongoose.Types.ObjectId(body._id) },
    { $push: { times: { start: body.start, end: "running" } } }
  )
    .then(({ times }) => {
      res.send({
        ...body,
        runningTimeId: getRunningTimeId(times)
      });
    })
    .catch(logger)
);

app.post("/saveEndTime", ({ body }, res) =>
  saveTime(
    { _id: mongoose.Types.ObjectId(body.runningId), "times.end": "running" },
    { $set: { "times.$.end": body.end } }
  )
    .then(() => res.send(body))
    .catch(logger)
);

app.get("/fetchTotalDurations", ({ query: { wis, userId, today, now } }, res) =>
  Promise.all([
    fetchLogs({ wis, userId, date: today }),
    fetchLogs({
      wis, userId,
      $and: [
        { date: { $gte: getStartDayOfWeek(today) } },
        { date: { $lte: today } }
      ]
    }),
    fetchLogs({
      wis, userId,
      $and: [
        { date: { $gte: getStartDayOfMonth(today) } },
        { date: { $lte: today } }
      ]
    })
  ])
    .then(success =>
      res.json({
        today: sumLogs(success[0], now),
        thisWeek: sumLogs(success[1], now),
        thisMonth: sumLogs(success[2], now)
      })
    )
    .catch(logger)
);

app.get("/calculateTotalDuration", ({ query }, res) =>
  fetchLogs(modifiedQuery(query))
    .then(logs => dynamicSumLogs(logs, query.now))
    .then(sum => formattedSeconds(sum))
    .then(totalDuration => res.json(totalDuration))
    .catch(logger))

app.get("/convertJSONToCSV", ({ query }, res) =>
  fetchLogs(modifiedQuery(query))
    .then(logs => getJSON(logs, query.now)) 
    .then(csv => {
      res.setHeader("Content-disposition", "attachment; filename=data.csv");
      res.set("Content-Type", "text/csv");
      res.status(200).send(csv);
    })
    .catch(logger))

app.get("/barChartData", ({ query }, res) => {
  const newQuery = {
    wis: query.wis,
    userId: query.userId,
    $and: [
      { date: { $gte: query.startDate } },
      { date: { $lte: query.endDate } }
    ]
  };
  fetchLogs(newQuery)
    .then(logs => res.send(getBarChartData(logs, query)))
    .catch(logger);
});

app.get("/leaderboardData", ({ query: { wis, startDate, endDate, now } }, res) => {
  const newQuery = { 
    wis,
    $and: [
      { date: { $gte: startDate } },
      { date: { $lte: endDate } }
    ]
  };
  fetchLogs(newQuery)
    .then(logs => res.send(getLeaderboardData(logs, now)))
    .catch(logger);
});

app.post("/updateLog", ({ body, body: { _id } }, res) =>
  updateLog({ _id }, body)
    .then(log => res.send(log))
    .catch(logger)
);
