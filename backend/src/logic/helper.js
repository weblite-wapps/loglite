// modules
import json2csv from 'json2csv'
import * as R from 'ramda'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import format from 'date-fns/format'
import differenceInDays from 'date-fns/difference_in_days'
import addDays from 'date-fns/add_days'


export const defaultQueryGenerator = query => ({
  wis: query.wis,
  userId: query.userId,
})

export const queryGenerator = query => ({
  wis: query.wis,
  userId: query.userId,
  $and: [{ date: { $gte: query.startDate } }, { date: { $lte: query.endDate } }],
})

const formattedTags = tags =>
  R.slice(1, JSON.stringify(tags).length - 1, JSON.stringify(tags))

const sumTimes = times =>
  R.reduce((acc, time) => time.end === 'running' ? acc : acc + differenceInSeconds(time.end, time.start), 0)(times)

export const sumLogs = logs =>
  R.reduce((acc, log) => acc + sumTimes(log.times), 0)(logs)

export const formattedSeconds = (seconds, pageName) => {
  if (pageName === 'Home') {
    if (Math.floor(seconds / 3600) === 0) {
      return `${Math.floor(seconds / 60)}m`
    }
    return Math.floor((seconds % 3600) / 60) === 0 ?
      `${Math.floor(seconds / 3600)}h` :
      `${Math.floor(seconds / 3600)}h & ${Math.floor((seconds % 3600) / 60)}m`
  }
  if (Math.floor(seconds / 3600) === 0) {
    return `Total: ${Math.floor(seconds / 60)}m`
  }
  return Math.floor((seconds % 3600) / 60) === 0 ?
    `Total: ${Math.floor(seconds / 3600)}h` :
    `Total: ${Math.floor(seconds / 3600)}h & ${Math.floor((seconds % 3600) / 60)}m`
}

export const modifiedQuery = (query) => {
  if (!query.selectedTags) {
    return {
      ...queryGenerator(query),
    }
  } else if (Array.isArray(query.selectedTags)) {
    return {
      ...queryGenerator(query),
      tags: { $in: query.selectedTags },
    }
  }
  return {
    ...queryGenerator(query),
    tags: query.selectedTags,
  }
}

export const getJSON = (logs) => {
  // let formattedData = logs.map( R.compose())
  let formattedData = R.map(log =>
    R.dissoc('times', R.assoc('duration', formattedSeconds(sumTimes(log.times), 'Home'), log)), logs)
  const tagsLens = R.lensProp('tags')
  formattedData = R.map(log => R.set(tagsLens, formattedTags(log.tags), log), formattedData)
  const fields = ['title', 'tags', 'duration', 'date']
  return json2csv({ data: formattedData, fields })
}

export const getBarChartData = (logs, query) => {
  let dates = Array(
    differenceInDays(new Date(query.endDate), new Date(query.startDate)) + 1)
    .fill(query.startDate)
  dates = dates.map((date, index) =>
    format(addDays(new Date(date), index), 'YYYY-MM-DD'))
  return R.map(date => ({
    name: date,
    duration: Math.floor(sumLogs(R.filter(log => log.date === date, logs)) / 60) }), dates)
}
