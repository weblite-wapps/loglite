// modules
import { combineEpics } from 'redux-observable'
import { userIdView } from './App.reducer'
// actions
import {
  HANDLE_REAL_TIME,
  ADD_LOG,
  DELETE_LOG,
  SAVE_START_TIME,
  SAVE_END_TIME,
  dispatchHandleSaveEndTimeRealTime,
  dispatchDeleteLogRealTime,
  dispatchSaveStartTimeRealTime,
  ADD_LOG_TO_NEXT_DAY,
  dispatchAddLogToNextDayRealTime,
} from './App.action'
import { dispatchAddLogRealTime } from '../components/Add/Main/Add.action'
import {
  SUBMIT_EDIT_REALTIME,
  dispatchSubmitEditRealTime,
} from '../components/Edit/Main/Edit.action'

const fetchNotingSubscribe = action$ =>
  action$
    .ofType(HANDLE_REAL_TIME)
    .pluck('payload')
    .do(({ data, type, userId }) => {
      if (userId !== userIdView()) {
        return
      }
      type === ADD_LOG && dispatchAddLogRealTime(data)
      type === DELETE_LOG && dispatchDeleteLogRealTime(data)
      type === SAVE_END_TIME && dispatchHandleSaveEndTimeRealTime(data)
      type === SAVE_START_TIME && dispatchSaveStartTimeRealTime(data)
      type === SUBMIT_EDIT_REALTIME && dispatchSubmitEditRealTime(data)
      type === ADD_LOG_TO_NEXT_DAY && dispatchAddLogToNextDayRealTime(data)
    })
    .ignoreElements()

export default combineEpics(fetchNotingSubscribe)
