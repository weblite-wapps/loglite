// modules
import * as R from "ramda"
import mongoose from "mongoose"
// components
import app from '../../setup/server'
import '../components/user/route'
import '../components/log/route'
import '../components/tag/route'
// db helpers
import { fetchLogs, updateLog, saveLog } from '../components/log/db'
import { fetchTags } from '../components/tag/db'
import { fetchPins, savePin, deletePin, updatePins } from '../components/pin/db'
// helpers
import { sumLogs, formattedSeconds, formattedDate, getSixDaysAgo, getStartDayOfWeek, getStartDayOfMonth, defaultQueryGenerator, getLeaderboardData } from './helper'
// const
const logger = console.log


app.get('/initialFetch', ({ query }, res) =>
  Promise.all([
    fetchLogs({ ...defaultQueryGenerator(query),
      $and: [{ date: { $gte: getSixDaysAgo(query.today) } }, { date: { $lte: query.today } }],
    }),
    fetchTags({ ...defaultQueryGenerator(query) }),
    fetchLogs({ ...defaultQueryGenerator(query), date: query.today }),
    fetchLogs({
      ...defaultQueryGenerator(query),
      $and: [{ date: { $gte: getStartDayOfWeek(query.today) } }, { date: { $lte: query.today } }],
    }),
    fetchLogs({
      ...defaultQueryGenerator(query),
      $and: [{ date: { $gte: getStartDayOfMonth(query.today) } }, { date: { $lte: query.today } }],
    }),
    fetchLogs({ wis: query.wis, date: query.today }),
    fetchPins({ ...defaultQueryGenerator(query) }),
  ]).then(success => res.json({
    logs: success[0],
    tags: success[1],
    totalDurations: {
      today: formattedSeconds(sumLogs(success[2]), 'Home'),
      thisWeek: formattedSeconds(sumLogs(success[3]), 'Home'),
      thisMonth: formattedSeconds(sumLogs(success[4]), 'Home'),
    },
    leaderboard: getLeaderboardData(success[5]),
    pins: success[6],
  })).catch(logger))

  app.post("/toggleIsPinned", ({ body: { _id, title, tags, value, userId, wis } }, res) =>
    Promise.all([
      updateLog({ _id: mongoose.Types.ObjectId(_id) },
        { $set: { 'isPinned': value } }),
      (value === true) ?
        savePin({ logId: mongoose.Types.ObjectId(_id), title, tags, created_at: new Date(), lastDate: formattedDate(new Date()), userId, wis }) :
        deletePin({ wis, userId, title })
    ]).then(() => res.send({ _id, value })).catch(logger))

  app.post("/saveLogs", ({ body: { pins, date, userId, wis } }, res) =>
    Promise.all(
      R.map(pin =>
        saveLog({ title: pin.title, tags: pin.tags, created_at: new Date(), userId, wis, times: [], date: formattedDate(new Date()), isPinned: true } ), pins),
        updatePins({ wis, userId },
        { $set: { 'lastDate': formattedDate(new Date()) } }))
    .then(success => res.send(R.flatten(success))).catch(logger),
  )