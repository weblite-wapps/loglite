// modules
import format from 'date-fns/format'
// models
import User from '../models/user'
import Log from '../models/log'
import Tag from '../models/tag'

export const fetchUsers = async query => User
  .find(query)
  .exec()

export const fetchLogs = async query => Log
  .find(query)
  .sort({ date: 1 })
  .exec()

export const fetchTags = async query => Tag
  .find(query)
  .sort({ number: -1 })
  .limit(5)
  .exec()

export const saveUser = async user => new User(user)
  .save()

export const saveLog = async log => new Log(log)
  .save()

export const saveCustomLog = async log => new Log(log)
  .save((err, result) => {
    if (err) throw err
    if (result.date === format(new Date(), 'YYYY-MM-DD')) return result
    return 'added successfully!'
  })

export const countUser = async query => User
  .find(query)
  .count()

export const countTags = async query => Tag
  .find(query)
  .count()

export const saveTag = async tag => new Tag(tag)
  .save()

export const updateTag = async (query, operation) => Tag
  .update(query, operation)
  .exec()

export const deleteLog = async query => Log
  .remove(query)
  .exec()

export const saveTime = async (query, operation) => Log
  .update(query, operation)
  .exec()
