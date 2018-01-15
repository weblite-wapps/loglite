// modules
import * as R from 'ramda'
import format from 'date-fns/format'
// models
import Log from './models/log'
import Tag from './models/tag'
// helpers
import { sumLogs, formattedSeconds } from './server.helper'
// const
const logger = console.log


export const fetchLogs = async query => Log
  .find(query)
  .sort({ date: 1 })
  .toArray((err, logs) => {
    if (err) throw err
    return logs
  })
  .catch(logger)

export const fetchTags = async query => Tag
  .find(query)
  .sort({ number: -1 })
  .limit(5)
  .toArray((err, tags) => {
    if (err) throw err
    return tags
  })
  .catch(logger)

export const insertLog = async query => Log
  .insertOne(query, (err, result) => {
    if (err) throw err
    return result.ops[0]
  })
  .catch(logger)

export const insertCustomLog = async query => Log
  .insertOne(query, (err, result) => {
    if (err) throw err
    if (result.ops[0].date === format(new Date(), 'YYYY-MM-DD')) return result.ops[0]
    return 'added successfully!'
  })
  .catch(logger)

export const countTags = async query => Tag
  .find(query)
  .count((err, number) => {
    if (err) throw err
    return number
  })
  .catch(logger)

export const insertTag = async query => Tag
  .insertOne(query, (err) => {
    if (err) throw err
    return 'added successfully!'
  })
  .catch(logger)

export const updateTag = async (query, operations) => Tag
  .update(query, operation, (err) => {
    if (err) throw err
    return 'updated successfully!'
  })
  .catch(logger)

export const deleteLog = async query => Log
  .remove(query, (err) => {
    if (err) throw err
    return 'deleted successfully!'
  })
  .catch(logger)

export const saveTime = async query => Log
  .update(query, operation, (err) => {
    if (err) throw err
    return 'time updated!'
  })
  .catch(logger)

export const calculateTotalDuration = async (query, page) => Log
  .find(query)
  .toArray((err, logs) => {
    if (err) throw err
    return formattedSeconds(sumLogs(doc), page)
  })
  .catch(logger)


export const getBarChartData = async (query, dates) => Log
  .find(query)
  .toArray((err, logs) => {
    if (err) throw err
    return R.map(date => ({
      name: date,
      duration: Math.floor(sumLogs(R.filter(log => log.date === date, logs)) / 60) }), dates)
  })
  .catch(logger)
