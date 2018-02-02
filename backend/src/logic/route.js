// modules
import mongoose from 'mongoose'
import R from 'ramda'
// components
import app from '../setup/server'
// db helpers
import {
  fetchUsers,
  fetchLogs,
  fetchTags,
  saveUser,
  saveLog,
  saveCustomLog,
  countUser,
  countTags,
  saveTag,
  updateTag,
  deleteLog,
  saveTime,
} from './db'
// helpers
import { sumLogs, formattedSeconds, modifiedQuery, getBarChartData,
  getJSON, defaultQueryGenerator } from './helper'
// const
const logger = console.log


app.get('/initialFetch', (req, res) =>
  Promise.all([
    fetchLogs({ ...defaultQueryGenerator(req.query), date: req.query.today }),
    fetchTags({ ...defaultQueryGenerator(req.query) }),
    fetchLogs({ ...defaultQueryGenerator(req.query), date: req.query.today }),
    fetchLogs({
      ...defaultQueryGenerator(req.query),
      $and: [{ date: { $gte: req.query.startOfWeek } }, { date: { $lte: req.query.today } }],
    }),
    fetchLogs({
      ...defaultQueryGenerator(req.query),
      $and: [{ date: { $gte: req.query.startOfMonth } }, { date: { $lte: req.query.today } }],
    }),
  ]).then(success => res.json({
    logs: success[0],
    tags: success[1],
    today: formattedSeconds(sumLogs(success[2]), 'Home'),
    thisWeek: formattedSeconds(sumLogs(success[3]), 'Home'),
    thisMonth: formattedSeconds(sumLogs(success[4]), 'Home'),
  })).catch(logger))


app.get('/fetchUsers', (req, res) =>
  fetchUsers({ wis: req.query.wis, id: { $regex: `${req.query.userId}` } })
    .then(users => res.json(users))
    .catch(logger))


app.get('/fetchLogs', (req, res) =>
  fetchLogs({ wis: req.query.wis, userId: req.query.userId, date: req.query.date })
    .then(logs => res.json(R.reverse(logs)))
    .catch(logger))


app.get('/fetchTags', (req, res) =>
  fetchTags({ wis: req.query.wis, userId: req.query.userId })
    .then(logs => res.json(logs))
    .catch(logger))


app.get('/serachTags', (req, res) =>
  fetchTags({ wis: req.query.wis, userId: req.query.userId, label: { $regex: `.*${req.query.label}.*` } })
    .then(tags => res.json(tags))
    .catch(logger))


app.post('/saveUser', (req, res) => {
  countUser({ wis: req.body.wis, id: req.body.userId }).then((number) => {
    if (number === 0) {
      saveUser({ wis: req.body.wis, name: req.body.username, id: req.body.userId })
        .then(user => res.json(user))
        .catch(logger)
    } else res.send('user was saved before!')
  })
})


app.post('/saveLog', (req, res) =>
  saveLog(req.body)
    .then(log => res.send(log))
    .catch(logger))


app.post('/saveCustomLog', (req, res) =>
  saveCustomLog(req.body)
    .then(log => res.send(log))
    .catch(logger))


app.post('/saveTags', (req, res) => {
  const addOrUpdateTag = tag =>
    countTags({ wis: req.body.wis, userId: req.body.userId, label: tag })
      .then((number) => {
        if (number === 0) {
          saveTag({ label: tag, number: 1, userId: req.body.userId, wis: req.body.wis })
        } else updateTag({ label: tag }, { $inc: { number: 1 } })
      })
  R.forEach(addOrUpdateTag, req.body.tags)
  fetchTags({ wis: req.body.wis, userId: req.body.userId })
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
    .then(() => res.send('saved successfully!'))
    .catch(logger))


app.post('/saveEndTime', (req, res) =>
  saveTime({ _id: mongoose.Types.ObjectId(req.body._id), 'times.end': 'running' }, { $set: { 'times.$.end': new Date(req.body.endTime) } })
    .then(() => res.send('saved successfully!'))
    .catch(logger))

app.get('/fetchTotalDurations', (req, res) =>
  Promise.all([
    fetchLogs({ ...defaultQueryGenerator(req.query), date: req.query.today }),
    fetchLogs({
      ...defaultQueryGenerator(req.query),
      $and: [{ date: { $gte: req.query.startOfWeek } }, { date: { $lte: req.query.today } }],
    }),
    fetchLogs({
      ...defaultQueryGenerator(req.query),
      $and: [{ date: { $gte: req.query.startOfMonth } }, { date: { $lte: req.query.today } }],
    }),
  ]).then(success => res.json({
    today: formattedSeconds(sumLogs(success[0]), 'Home'),
    thisWeek: formattedSeconds(sumLogs(success[1]), 'Home'),
    thisMonth: formattedSeconds(sumLogs(success[2]), 'Home'),
  })).catch(logger))


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
    .then(totalDuration => res.json(totalDuration))
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
