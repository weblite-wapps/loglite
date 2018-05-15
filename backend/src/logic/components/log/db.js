// models
import Log from '../../../models/log'


export const fetchLogs = async query => Log
  .find(query)
  .sort({ created_at: -1 })
  .exec()

export const saveLog = async log => new Log(log)
  .save()

export const deleteLog = async query => Log
  .remove(query)
  .exec()

export const saveTime = async (query, updateObject) => Log
  .update(query, updateObject)
  .exec()
