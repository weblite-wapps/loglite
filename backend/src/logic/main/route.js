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
import { sumLogs, formattedSeconds, getYesterday, getStartDayOfWeek, getStartDayOfMonth, defaultQueryGenerator } from './helper'
// const
const logger = console.log


app.get('/initialFetch', ({ query }, res) =>
  Promise.all([
    fetchLogs({ ...defaultQueryGenerator(query),
      $and: [{ date: { $gte: getYesterday(query.today) } }, { date: { $lte: query.today } }],
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
    leaderboard: R.compose(
      R.map(logs => ({
        userId: logs[0].userId,
        score: Math.floor(sumLogs(logs) / 60),
      })),
      R.values,
      R.groupBy(R.prop('userId')),
    )(success[5])
  })).catch(logger))
