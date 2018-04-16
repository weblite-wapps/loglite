// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../setup/redux'

// actions
export const SET_API = 'SET_API'
export const setAPI = createAction(SET_API, (creator, user) => ({ creator, user }))
export const dispatchSetApi = (...args) => dispatch(setAPI(...args))

export const FETCH_TODAY_DATA = 'FETCH_TODAY_DATA'
export const fetchTodayData = createAction(FETCH_TODAY_DATA)
export const dispatchFetchTodayData = (...args) => dispatch(fetchTodayData(...args))

export const SET_ISLOADING = 'SET_ISLOADING'
export const setIsLoading = createAction(SET_ISLOADING, value => ({ value }))
export const dispatchSetIsLoading = (...args) => dispatch(setIsLoading(...args))

export const CHANGE_TAB = 'CHANGE_TAB'
export const changeTab = createAction(CHANGE_TAB, value => ({ value }))
export const dispatchChangeTab = (...args) => dispatch(changeTab(...args))

export const LOAD_USERS_DATA = 'LOAD_USERS_DATA'
export const loadUsersData = createAction(LOAD_USERS_DATA, users => ({ users }))
export const dispatchLoadUsersData = (...args) => dispatch(loadUsersData(...args))

export const FETCH_ADMIN_DATA = 'FETCH_ADMIN_DATA'
export const fetchAdminData = createAction(FETCH_ADMIN_DATA)
export const dispatchFetchAdminData = (...args) => dispatch(fetchAdminData(...args))

export const LOAD_LOGS_DATA = 'LOAD_LOGS_DATA'
export const loadLogsData = createAction(LOAD_LOGS_DATA, logs => ({ logs }))
export const dispatchLoadLogsData = (...args) => dispatch(loadLogsData(...args))

export const CHANGE_POPOVER_ID = 'CHANGE_POPOVER_ID'
export const changePopoverId = createAction(CHANGE_POPOVER_ID, value => ({ value }))
export const dispatchChangePopoverId = (...args) => dispatch(changePopoverId(...args))

export const ADD_LOG = 'ADD_LOG'
export const addLog = createAction(ADD_LOG, (title, tags) => ({ title, tags }))
export const dispatchAddLog = (...args) => dispatch(addLog(...args))

export const ADD_CUSTOM_LOG = 'ADD_CUSTOM_LOG'
export const addCustomLog = createAction(
  ADD_CUSTOM_LOG,
  (title, tags, date, start, end) => ({ title, tags, date, start, end }),
)
export const dispatchAddCustomLog = (...args) => dispatch(addCustomLog(...args))

export const ADD_LOG_TO_NEXT_DAY = 'ADD_LOG_TO_NEXT_DAY'
export const addLogToNextDay = createAction(
  ADD_LOG_TO_NEXT_DAY,
  (title, tags, end, date) => ({ title, tags, end, date }),
)
export const dispatchAddLogToNextDay = (...args) => dispatch(addLogToNextDay(...args))

export const RESTORE_LOG = 'RESTORE_LOG'
export const restoreLog = createAction(RESTORE_LOG, log => ({ log }))
export const dispatchRestoreLog = (...args) => dispatch(restoreLog(...args))

export const DELETE_LOG = 'DELETE_LOG'
export const deleteLog = createAction(DELETE_LOG, _id => ({ _id }))
export const dispatchDeleteLog = (...args) => dispatch(deleteLog(...args))

export const SAVE_START_TIME = 'SAVE_START_TIME'
export const saveStartTime = createAction(SAVE_START_TIME, (_id, start) => ({ _id, start }))
export const dispatchSaveStartTime = (...args) => dispatch(saveStartTime(...args))

export const SAVE_END_TIME = 'SAVE_END_TIME'
export const saveEndTime = createAction(SAVE_END_TIME, (_id, end) => ({ _id, end }))
export const dispatchSaveEndTime = (...args) => dispatch(saveEndTime(...args))

export const SET_ABOUT_MODE = 'SET_ABOUT_MODE'
export const setAboutMode = createAction(SET_ABOUT_MODE, value => ({ value }))
export const dispatchSetAboutMode = (...args) => dispatch(setAboutMode(...args))

// effects
export const HANDLE_SAVE_START_TIME = 'HANDLE_SAVE_START_TIME'
export const handleSaveStartTime = createAction(
  HANDLE_SAVE_START_TIME,
  (_id, start) => ({ _id, start }),
)
export const dispatchHandleSaveStartTime = (...args) => dispatch(handleSaveStartTime(...args))

export const HANDLE_SAVE_END_TIME = 'HANDLE_SAVE_END_TIME'
export const handleSaveEndTime = createAction(HANDLE_SAVE_END_TIME, (_id, end) => ({ _id, end }))
export const dispatchHandleSaveEndTime = (...args) => dispatch(handleSaveEndTime(...args))
