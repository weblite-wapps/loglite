// modules
import * as R from 'ramda'
// components
import app from '../../setup/server'
import '../components/user/route'
import '../components/log/route'
import '../components/tag/route'
// db helpers
import { fetchLogs } from '../components/log/db'
import { fetchTags } from '../components/tag/db'
// helpers
import { sumLogs, formattedSeconds, getSixDaysAgo, getStartDayOfWeek, getStartDayOfMonth, defaultQueryGenerator, getLeaderboardData } from './helper'
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
  ]).then(success => res.json({
    logs: success[0],
    tags: success[1],
    totalDurations: {
      today: formattedSeconds(sumLogs(success[2]), 'Home'),
      thisWeek: formattedSeconds(sumLogs(success[3]), 'Home'),
      thisMonth: formattedSeconds(sumLogs(success[4]), 'Home'),
    },
    leaderboard: getLeaderboardData(success[5]),
  })).catch(logger))
