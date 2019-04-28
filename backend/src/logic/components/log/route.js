// modules
import mongoose from "mongoose"
import * as R from "ramda"
// components
import app from "../../../setup/server"
// db helpers
import { fetchLogs, saveLog, deleteLog, saveTime } from "./db"
// helpers
import {
  sumLogs,
  formattedSeconds,
  formattedDate,
  modifiedQuery,
  getBarChartData,
  getJSON,
  defaultQueryGenerator,
  getStartDayOfWeek,
  getStartDayOfMonth,
  getLeaderboardData,
} from "../../main/helper"
// const
const logger = console.log

app.get("/fetchLogs", ({ query: { wis, userId, date } }, res) =>
  fetchLogs({ wis, userId, date })
    .then(logs => res.json(R.reverse(logs)))
    .catch(logger),
)

app.post("/saveLog", (req, res) =>
  saveLog({ ...req.body, date: formattedDate(new Date()), created_at: new Date() })
    .then(log => res.send(log))
    .catch(logger),
)

app.post("/saveCustomLog", (req, res) =>
  saveLog({ ...req.body, created_at: new Date() })
    .then(log => res.send(log))
    .catch(logger),
)

app.post("/insertLogToNextDay", (req, res) =>
  saveLog({ ...req.body, created_at: new Date() }) 
    .then(log => res.send(log))
    .catch(logger),
)

app.post("/deleteLog", ({ query }, res) =>
  deleteLog({ _id: mongoose.Types.ObjectId(query._id) })
    .then(() => res.send(query))
    .catch(logger),
)

app.post("/saveStartTime", ({ body }, res) =>
  saveTime(
    { _id: mongoose.Types.ObjectId(body._id) },
    { $push: { times: { start: new Date(), end: "running" } } },
  )
    .then(() => res.send(body))
    .catch(logger),
)

app.post("/saveEndTime", ({ body }, res) =>
  saveTime(
    { _id: mongoose.Types.ObjectId(body.runningId), "times.end": "running" },
    { $set: { "times.$.end": body.end || new Date() } },
  )
    .then(() => res.send(body))
    .catch(logger),
)

app.get("/fetchTotalDurations", ({ query }, res) =>
  Promise.all([
    fetchLogs({ ...defaultQueryGenerator(query), date: query.today }),
    fetchLogs({
      ...defaultQueryGenerator(query),
      $and: [
        { date: { $gte: getStartDayOfWeek(query.today) } },
        { date: { $lte: query.today } },
      ],
    }),
    fetchLogs({
      ...defaultQueryGenerator(query),
      $and: [
        { date: { $gte: getStartDayOfMonth(query.today) } },
        { date: { $lte: query.today } },
      ],
    }),
  ])
    .then(success =>
      res.json({
        today: formattedSeconds(sumLogs(success[0]), "Home"),
        thisWeek: formattedSeconds(sumLogs(success[1]), "Home"),
        thisMonth: formattedSeconds(sumLogs(success[2]), "Home"),
      }),
    )
    .catch(logger),
)

app.get("/calculateTotalDuration", (req, res) => {
  const query = modifiedQuery(req.query)
  fetchLogs(query, "Report")
    .then(sumLogs)
    .then(sum => formattedSeconds(sum, "Report"))
    .then(totalDuration => res.json(totalDuration))
    .catch(logger)
})

app.get("/convertJSONToCSV", (req, res) => {
  const query = modifiedQuery(req.query)
  fetchLogs(query)
    .then(logs => getJSON(logs))
    .then(csv => {
      res.setHeader("Content-disposition", "attachment; filename=data.csv")
      res.set("Content-Type", "text/csv")
      res.status(200).send(csv)
    })
    .catch(logger)
})

app.get("/barChartData", ({ query }, res) => {
  const newQuery = {
    wis: query.wis,
    userId: query.userId,
    $and: [
      { date: { $gte: query.startDate } },
      { date: { $lte: query.endDate } },
    ],
  }
  fetchLogs(newQuery)
    .then(logs => res.send(getBarChartData(logs, query)))
    .catch(logger)
})

app.get("/leaderboardData", ({ query }, res) => {
  const newQuery = {
    wis: query.wis,
    $and: [
      { date: { $gte: query.startDate } },
      { date: { $lte: query.endDate } },
    ],
  }
  fetchLogs(newQuery)
    .then(logs => res.send(getLeaderboardData(logs)))
    .catch(logger)
})

app.get("/getAnalysisData", ({ query: { wis, userId } }, res) =>
    fetchLogs({ wis })
      .then(logs => res.send(getAnalysisData(logs, userId)))
      .catch(logger))