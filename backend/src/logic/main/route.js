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
import { sumLogs, getLeaderboardData } from '../../helper/query.helper'
import { getSixDaysAgo, getStartDayOfWeek, getStartDayOfMonth } from '../../helper/date.helper'
import { getNow } from '../../helper/time.helper'
// const
const logger = console.log


app.get('/initialFetch', ({ query: { wis, userId, today, now } }, res) =>
  Promise.all([
    fetchLogs({
      wis, userId,
      $and: [{ date: { $gte: getSixDaysAgo(today) } }, { date: { $lte: today } }],
    }),
    fetchTags({ wis, userId }),
    fetchLogs({ wis, userId, date: today }),
    fetchLogs({
      wis, userId,
      $and: [{ date: { $gte: getStartDayOfWeek(today) } }, { date: { $lte: today } }],
    }),
    fetchLogs({
      wis, userId,
      $and: [{ date: { $gte: getStartDayOfMonth(today) } }, { date: { $lte: today } }],
    }),
    fetchLogs({ wis, date: today }),
    fetchPins({ wis, userId }),
  ]).then(success => res.json({
    logs: success[0],
    tags: success[1],
    totalDurations: {
      today: sumLogs(success[2], now),
      thisWeek: sumLogs(success[3], now),
      thisMonth: sumLogs(success[4], now),
    },
    leaderboard: getLeaderboardData(success[5], now),
    pins: success[6],
  })).catch(logger))

app.post("/toggleIsPinned", ({ body: { _id, title, tags, value, lastDate, userId, wis } }, res) =>
  Promise.all([
    updateLog({ _id: mongoose.Types.ObjectId(_id) },
      { $set: { 'isPinned': value } }),
    (value === true) ?
      savePin({ logId: mongoose.Types.ObjectId(_id), title, tags, created_at: getNow(), lastDate, userId, wis }) :
      deletePin({ wis, userId, title })
  ]).then(() => res.send({ _id, value })).catch(logger))

app.post("/saveLogs", ({ body: { pins, date, userId, wis } }, res) =>
  Promise.all(
    R.map(pin =>
      saveLog({ title: pin.title, tags: pin.tags, created_at: getNow(), userId, wis, times: [], date, isPinned: true }), pins),
    updatePins({ wis, userId },
      { $set: { 'lastDate': date } }))
    .then(success => res.send(R.flatten(success))).catch(logger),
)