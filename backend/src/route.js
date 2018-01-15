// modules
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import json2csv from 'json2csv'
import * as R from 'ramda'
import format from 'date-fns/format'
import differenceInDays from 'date-fns/difference_in_days'
import addDays from 'date-fns/add_days'
// db helpers
import {
  fetchLogs,
  fetchTags,
  insertLog,
  insertCustomLog,
  countTags,
  insertTag,
  updateTag,
  deleteLog,
  saveTime,
  calculateTotalDuration,
  getBarChartData,
 } from './db'
// helpers
import { sumTimes, formattedSeconds, formattedTags } from './server.helper'
// const
const app = express()
app.use(cors({
  origin: '*',
}))
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
function errorHandler(err, req, res) {
  res.status(500)
  res.render('error_template', { error: err })
}
app.use(errorHandler)

app.get('/', (req, res) =>
  fetchLogs({ wis: req.query.wis, date: req.query.date })
  .then(logs => res.json(logs)))

app.get('/fetchTags', (req, res) =>
  fetchTags({ wis: req.query.wis })
  .then(tags => res.json(tags)))

app.get('/serachTags', (req, res) =>
  fetchTags({ wis: req.query.wis, label: { $regex: `.*${req.query.label}.*` } })
  .then(tags => res.json(tags)))

app.post('/insertLog', (req, res) =>
  insertLog(req.body)
  .then(log => res.send(log)))

app.post('/insertCustomLog', (req, res) =>
  insertCustomLog(req.body)
  .then(log => res.send(log)))

app.post('/insertTags', (req, res) => {
  const addOrUpdateTag = tag =>
    countTags({ wis: req.body.wis, label: tag })
    .then(number =>
      if (number ==== 0) {
        insertTag({ label: tag, number: 1, wis: req.body.wis })
      } else {
        updateTag({ label: tag }, { $inc: { number: 1 } })
      })
    R.forEach(addOrUpdateTag, req.body.tags)
    fetchTags({ wis: req.body.wis })
    .then(tags => res.json(tags))
  })

app.post('/insertLogToNextDay', (req, res) => {
  insertLog(req.body)
  .then(log => res.send(log)))

app.post('/deleteLog', (req, res) =>
  deleteLog({ _id: ObjectID(req.query._id) })
  .then(message => res.send(message)))

app.post('/saveStartTime', (req, res) =>
  saveTime({ _id: ObjectID(req.body._id) }, { $push: { times: { start: req.body.startTime, end: 'running' } } })
  .then(message => res.send(message)))

app.post('/saveEndTime', (req, res) =>
  saveTime({ _id: ObjectID(req.body._id), 'times.end': 'running' }, { $set: { 'times.$.end': req.body.endTime } })
  .then(message => res.send(message)))

app.post('/todayTotalDuration', (req, res) =>
  calculateTotalDuration({ wis: req.body.wis, date: req.body.date }, 'Home')
  .then(totalDuration => res.send(totalDuration)))

app.post('/thisWeekTotalDurations', (req, res) =>
  calculateTotalDuration({
    wis: req.body.wis,
    $and: [{ date: { $gte: req.body.startDate } }, { date: { $lte: req.body.endDate } }] }, 'Home')
  .then(totalDuration => res.send(totalDuration)))


app.post('/thisMonthTotalDurations', (req,res) =>
  calculateTotalDuration({
    wis: req.body.wis,
    $and: [{ date: { $gte: req.body.startDate } }, { date: { $lte: req.body.endDate } }] }, 'Home')
  .then(totalDuration => res.send(totalDuration)))


app.get('/fetchPreviousDayData', (req, res) =>
  fetchLogs({ wis: req.query.wis, date: req.query.date })
  .then(logs => res.json(logs)))

app.get('/fetchNextDayData', (req, res) =>
  fetchLogs({ wis: req.query.wis, date: req.query.date })
  .then(logs => res.json(logs)))

app.get('/calculateTotalDuration', (req, res) => {
  let query = null
  if (!req.query.selectedTags) {
    query = {
      wis: req.query.wis,
      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }],
    }
  } else if (Array.isArray(req.query.selectedTags)) {
    query = {
      wis: req.query.wis,
      tags: { $in: req.query.selectedTags },
      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }],
    }
  } else {
    query = {
      wis: req.query.wis,
      tags: req.query.selectedTags,
      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }],
    }
  }
  calculateTotalDuration(query, 'Report')
  .then(totalDuration => res.send(totalDuration))
})


app.get('/convertJSONToCSV', (req, res) => {
  let query = null
  if (!req.query.selectedTags) {
    query = {
      wis: req.query.wis,
      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }],
    }
  } else if (Array.isArray(req.query.selectedTags)) {
    query = {
      wis: req.query.wis,
      tags: { $in: req.query.selectedTags },
      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }],
    }
  } else {
    query = {
      wis: req.query.wis,
      tags: req.query.selectedTags,
      $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }],
    }
  }
  fetchLogs(query)
  .then(logs => {
    let docFormatted = R.map(log =>
      R.dissoc('times', R.assoc('duration', formattedSeconds(sumTimes(log.times), 'Home'), log)), doc)
    const tagsLens = R.lensProp('tags')
    docFormatted = R.map(log => R.set(tagsLens, formattedTags(log.tags), log), docFormatted)
    const fields = ['title', 'tags', 'duration', 'date']
    json2csv({ data: docFormatted, fields }, (error, csv) => {
      res.setHeader('Content-disposition', 'attachment; filename=data.csv')
      res.set('Content-Type', 'text/csv')
      res.status(200).send(csv)
    })
  })
})


app.get('/barChartData', (req, res) => {
  const query = {
    wis: req.query.wis,
    $and: [{ date: { $gte: req.query.startDate } }, { date: { $lte: req.query.endDate } }],
  }
  let dates = Array(
    differenceInDays(new Date(req.query.endDate), new Date(req.query.startDate)) + 1)
    .fill(req.query.startDate)
  dates = dates.map((date, index) =>
    format(addDays(new Date(date), index), 'YYYY-MM-DD'))
  getBarChartData(query, dates)
  .then(barChartData => res.send(barChartData))
})
