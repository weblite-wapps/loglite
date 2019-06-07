// modules
import {
  createAction
} from 'redux-actions'
import {
  dispatch
} from '../../setup/redux'

// actions
export const SET_API = 'SET_API'
export const setAPI = createAction(SET_API, (creator, user) => ({
  creator,
  user,
}))
export const dispatchSetApi = (...args) => dispatch(setAPI(...args))

export const FETCH_TODAY_DATA = 'FETCH_TODAY_DATA'
export const fetchTodayData = createAction(FETCH_TODAY_DATA)
export const dispatchFetchTodayData = (...args) =>
  dispatch(fetchTodayData(...args))

export const SET_ISLOADING = 'SET_ISLOADING'
export const setIsLoading = createAction(SET_ISLOADING, value => ({
  value
}))
export const dispatchSetIsLoading = (...args) => dispatch(setIsLoading(...args))

export const CHANGE_TAB = 'CHANGE_TAB'
export const changeTab = createAction(CHANGE_TAB, value => ({
  value
}))
export const dispatchChangeTab = (...args) => dispatch(changeTab(...args))

export const LOAD_USERS_DATA = 'LOAD_USERS_DATA'
export const loadUsersData = createAction(LOAD_USERS_DATA, users => ({
  users
}))
export const dispatchLoadUsersData = (...args) =>
  dispatch(loadUsersData(...args))

export const LOAD_LOGS_DATA = 'LOAD_LOGS_DATA'
export const loadLogsData = createAction(LOAD_LOGS_DATA, logs => ({
  logs
}))
export const dispatchLoadLogsData = (...args) => dispatch(loadLogsData(...args))

export const CHANGE_POPOVER_ID = 'CHANGE_POPOVER_ID'
export const changePopoverId = createAction(CHANGE_POPOVER_ID, value => ({
  value,
}))
export const dispatchChangePopoverId = (...args) =>
  dispatch(changePopoverId(...args))

export const ADD_LOG = 'ADD_LOG'
export const addLog = createAction(ADD_LOG, log => ({
  log
}))
export const dispatchAddLog = (...args) => dispatch(addLog(...args))

export const ADD_LOG_TO_NEXT_DAY = 'ADD_LOG_TO_NEXT_DAY'
export const addLogToNextDay = createAction(
  ADD_LOG_TO_NEXT_DAY,
  (title, tags, isPinned, end, date) => ({
    title,
    tags,
    isPinned,
    end,
    date
  }),
)
export const dispatchAddLogToNextDay = (...args) =>
  dispatch(addLogToNextDay(...args))

export const RESTORE_LOG = 'RESTORE_LOG'
export const restoreLog = createAction(RESTORE_LOG, log => ({
  log
}))
export const dispatchRestoreLog = (...args) => dispatch(restoreLog(...args))

export const DELETE_LOG = 'DELETE_LOG'
export const deleteLog = createAction(DELETE_LOG, _id => ({
  _id
}))
export const dispatchDeleteLog = (...args) => dispatch(deleteLog(...args))

export const SAVE_START_TIME = 'SAVE_START_TIME'
export const saveStartTime = createAction(
  SAVE_START_TIME,
  (_id, start, runningTimeId) => ({
    _id,
    start,
    runningTimeId,
  }),
)
export const dispatchSaveStartTime = (...args) =>
  dispatch(saveStartTime(...args))

export const SAVE_END_TIME = 'SAVE_END_TIME'
export const saveEndTime = createAction(SAVE_END_TIME, (_id, end) => ({
  _id,
  end,
}))
export const dispatchSaveEndTime = (...args) => dispatch(saveEndTime(...args))

export const TOGGLE_IS_PINNED = 'TOGGLE_IS_PINNED'
export const toggleIsPinned = createAction(TOGGLE_IS_PINNED, (_id, value) => ({
  _id,
  value,
}))
export const dispatchToggleIsPinned = (...args) =>
  dispatch(toggleIsPinned(...args))

export const SET_ABOUT_MODE = 'SET_ABOUT_MODE'
export const setAboutMode = createAction(SET_ABOUT_MODE)
export const dispatchSetAboutMode = (...args) => dispatch(setAboutMode(...args))

export const SET_EDITED_LOG = 'SET_EDITED_LOG'
export const setEditedLog = createAction(SET_EDITED_LOG)
export const dispatchSetEditedLog = (...args) => dispatch(setEditedLog(...args))

// effects
export const HANDLE_SAVE_START_TIME = 'HANDLE_SAVE_START_TIME'
export const handleSaveStartTime = createAction(HANDLE_SAVE_START_TIME, (_id) => ({ _id }))
export const dispatchHandleSaveStartTime = (...args) =>
  dispatch(handleSaveStartTime(...args))

export const HANDLE_SAVE_END_TIME = 'HANDLE_SAVE_END_TIME'
export const handleSaveEndTime = createAction(
  HANDLE_SAVE_END_TIME,
  (runningId, end, _id, times) => ({
    runningId,
    end,
    _id,
    times
  }),
)
export const dispatchHandleSaveEndTime = (...args) =>
  dispatch(handleSaveEndTime(...args))

export const HANDLE_TOGGLE_IS_PINNED = 'HANDLE_TOGGLE_IS_PINNED'
export const handleToggleIsPinned = createAction(
  HANDLE_TOGGLE_IS_PINNED,
  (_id, title, tags, value) => ({
    _id,
    title,
    tags,
    value
  }),
)
export const dispatchHandleToggleIsPinned = (...args) =>
  dispatch(handleToggleIsPinned(...args))

export const HANDLE_DELETE_LOG = 'HANDLE_DELETE_LOG'
export const handleDeleteLog = createAction(HANDLE_DELETE_LOG, _id => ({
  _id
}))
export const dispatchHandleDeleteLog = (...args) =>
  dispatch(handleDeleteLog(...args))