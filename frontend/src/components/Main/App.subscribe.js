// modules
import { combineEpics } from 'redux-observable'
import { userIdView } from './App.reducer'
// actions
import {
  HANDLE_REAL_TIME,
  ADD_LOG,
  dispatchAddLog,
  DELETE_LOG,
  dispatchDeleteLog,
  SAVE_START_TIME,
  dispatchSaveStartTime,
  SAVE_END_TIME,
  dispatchSaveEndTime,
  dispatchHandleSaveEndTimeRealTime,
  dispatchDeleteLogRealTime,
  dispatchSaveStartTimeRealTime,
} from './App.action'
import { dispatchAddLogRealTime } from '../components/Add/Main/Add.action'
import {
  SUBMIT_EDIT_REALTIME,
  dispatchSubmitEditRealTime,
} from '../components/Edit/Main/Edit.action'
import { dispatchRefetchTotalDuration } from '../components/Home/Main/Home.action'

const fetchNotingSubscribe = action$ =>
  action$
    .ofType(HANDLE_REAL_TIME)
    .pluck('payload')
    .do(({ data, type, userId }) => {
      //   console.log(
      //     'in subscribe: type, data, userId , userIdView():   ',
      //     type,
      //     data,
      //   userId,
      //   userIdView(),
      //   )
      type === ADD_LOG &&
        userId === userIdView() &&
        dispatchAddLogRealTime(data)
      type === DELETE_LOG &&
        userId === userIdView() &&
        dispatchDeleteLogRealTime(data)
      type === SAVE_START_TIME &&
        userId === userIdView() &&
        dispatchSaveStartTimeRealTime(data)
      type === SAVE_END_TIME &&
        userId === userIdView() &&
        dispatchHandleSaveEndTimeRealTime(data)
      type === SUBMIT_EDIT_REALTIME &&
        userId === userIdView() &&
        dispatchSubmitEditRealTime(data)
    })
    .ignoreElements()

export default combineEpics(fetchNotingSubscribe)
