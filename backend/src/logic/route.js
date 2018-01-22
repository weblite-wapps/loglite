// modules
import mongoose from 'mongoose'
import * as R from 'ramda'
// components
import app from '../setup/server'
// db helpers
import {
  fetchLogs,
  fetchTags,
  saveLog,
  saveCustomLog,
  countTags,
  saveTag,
  updateTag,
  deleteLog,
  saveTime,
} from './db'
// helpers
import { sumLogs, formattedSeconds, modifiedQuery, getBarChartData, getJSON } from './helper'
// const
const logger = console.log

app.get('/fetchLogs', (req, res) =>
  fetchLogs({ wis: req.query.wis, userId: req.query.userId, date: req.query.date })
    .then(logs => res.json(logs))
    .catch(logger))


app.get('/fetchTags', (req, res) =>
  fetchTags({ wis: req.query.wis })
    .then(logs => res.json(logs))
    .catch(logger))


app.get('/serachTags', (req, res) =>
  fetchTags({ wis: req.query.wis, userId: req.query.userId, label: { $regex: `.*${req.query.label}.*` } })
    .then(tags => res.json(tags))
    .catch(logger))


app.post('/saveLog', (req, res) =>
  saveLog(req.body)
    .then(result => res.send(result))
    .catch(logger))


app.post('/saveCustomLog', (req, res) =>
  saveCustomLog(req.body)
    .then(log => res.send(log))
    .catch(logger))


app.post('/saveTags', (req, res) => {
  const addOrUpdateTag = tag =>
    countTags({ wis: req.body.wis, userId: req.query.userId, label: tag })
      .then((number) => {
        if (number === 0) {
          saveTag({ label: tag, number: 1, userId: req.query.userId, wis: req.body.wis })
        } else {
          updateTag({ label: tag }, { $inc: { number: 1 } })
        }
      })
  R.forEach(addOrUpdateTag, req.body.tags)
  fetchTags({ wis: req.body.wis, userId: req.query.userId })
    .then(tags => res.json(tags))
    .catch(logger)
})


app.post('/insertLogToNextDay', (req, res) =>
  saveLog(req.body)
    .then(log => res.send(log))
    .catch(logger))


app.post('/deleteLog', (req, res) =>
  deleteLog({ _id: mongoose.Types.ObjectId(req.query._id) })
    .then(() => res.send('deleted successfully!'))
    .catch(logger))


app.post('/saveStartTime', (req, res) =>
  saveTime({ _id: mongoose.Types.ObjectId(req.body._id) }, { $push: { times: { start: req.body.startTime, end: 'running' } } })
    .then(() => res.send('deleted successfully!'))
    .catch(logger))


app.post('/saveEndTime', (req, res) =>
  saveTime({ _id: mongoose.Types.ObjectId(req.body._id), 'times.end': 'running' }, { $set: { 'times.$.end': req.body.endTime } })
    .then(message => res.send(message))
    .catch(logger))


app.post('/todayTotalDuration', (req, res) =>
  fetchLogs({ wis: req.body.wis, userId: req.query.userId, date: req.body.date })
    .then(sumLogs)
    .then(sum => formattedSeconds(sum, 'Home'))
    .then(totalDuration => res.send(totalDuration))
    .catch(logger))


app.post('/thisWeekTotalDurations', (req, res) =>
  fetchLogs({
    wis: req.body.wis,
    userId: req.query.userId,
    $and: [{ date: { $gte: req.body.startDate } }, { date: { $lte: req.body.endDate } }] })
    .then(sumLogs)
    .then(sum => formattedSeconds(sum, 'Home'))
    .then(totalDuration => res.send(totalDuration))
    .catch(logger))


app.post('/thisMonthTotalDurations', (req, res) =>
  fetchLogs({
    wis: req.body.wis,
    userId: req.query.userId,
    $and: [{ date: { $gte: req.body.startDate } }, { date: { $lte: req.body.endDate } }] })
    .then(sumLogs)
    .then(sum => formattedSeconds(sum, 'Home'))
    .then(totalDuration => res.send(totalDuration))
    .catch(logger))


app.get('/fetchPreviousDayData', (req, res) =>
  fetchLogs({ wis: req.query.wis, userId: req.query.userId, date: req.query.date })
    .then(logs => res.json(logs))
    .catch(logger))


app.get('/fetchNextDayData', (req, res) =>
  fetchLogs({ wis: req.query.wis, userId: req.query.userId, date: req.query.date })
    .then(logs => res.json(logs))
    .catch(logger))


app.get('/calculateTotalDuration', (req, res) => {
  const query = modifiedQuery(req.query)
  fetchLogs(query, 'Report')
    .then(sumLogs)
    .then(sum => formattedSeconds(sum, 'Report'))
    .then(totalDuration => res.send(totalDuration))
    .catch(logger)
})


app.get('/convertJSONToCSV', (req, res) => {
  const query = modifiedQuery(req.query)
  fetchLogs(query)
    .then(logs => getJSON(logs))
    .then((csv) => {
      res.setHeader('Content-disposition', 'attachment; filename=data.csv')
      res.set('Content-Type', 'text/csv')
      res.status(200).send(csv)
    })
    .catch(logger)
})


app.get('/barChartData', (req, res) => {
  const query = {
    wis: req.query.wis,
    userId: req.query.userId,
    $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }],
  }
  fetchLogs(query)
    .then(logs => res.send(getBarChartData(logs, req.query)))
    .catch(logger)
})
