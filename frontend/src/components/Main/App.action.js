// modules
import { createAction } from 'redux-actions'


// actions
const SET_API = 'SET_API'
const setAPI = createAction(SET_API, (creator, user) => ({ creator, user }))

const FETCH_TODAY_DATA = 'FETCH_TODAY_DATA'
const fetchTodayData = createAction(FETCH_TODAY_DATA)

const SET_ISLOADING = 'SET_ISLOADING'
const setIsLoading = createAction(SET_ISLOADING, value => ({ value }))

const CHANGE_TAB = 'CHANGE_TAB'
const changeTab = createAction(CHANGE_TAB, value => ({ value }))

const LOAD_USERS_DATA = 'LOAD_USERS_DATA'
const loadUsersData = createAction(LOAD_USERS_DATA, users => ({ users }))

const LOAD_LOGS_DATA = 'LOAD_LOGS_DATA'
const loadLogsData = createAction(LOAD_LOGS_DATA, logs => ({ logs }))

const TOGGLE_EXPANDED = 'TOGGLE_EXPANDED'
const toggleExpanded = createAction(TOGGLE_EXPANDED, _id => ({ _id }))

const CHANGE_POPOVER_STAGE = 'CHANGE_POPOVER_STAGE'
const changePopoverStage = createAction(CHANGE_POPOVER_STAGE, (_id, value) => ({ _id, value }))

const ADD_LOG = 'ADD_LOG'
const addLog = createAction(ADD_LOG, (title, tags) => ({ title, tags }))

const ADD_CUSTOM_LOG = 'ADD_CUSTOM_LOG'
const addCustomLog = createAction(
  ADD_CUSTOM_LOG,
  (title, tags, date, start, end) => ({ title, tags, date, start, end }),
)

const ADD_LOG_TO_NEXT_DAY = 'ADD_LOG_TO_NEXT_DAY'
const addLogToNextDay = createAction(
  ADD_LOG_TO_NEXT_DAY,
  (title, tags, end, date) => ({ title, tags, end, date }),
)

const RESTORE_LOG = 'RESTORE_LOG'
const restoreLog = createAction(RESTORE_LOG, log => ({ log }))

const DELETE_LOG = 'DELETE_LOG'
const deleteLog = createAction(DELETE_LOG, _id => ({ _id }))

const SET_SECONDS_ELAPSED = 'SET_SECONDS_ELAPSED'
const setSecondsElapsed = createAction(SET_SECONDS_ELAPSED, (_id, value) => ({ _id, value }))

const INCREMENT_SECONDS_ELAPSED = 'INCREMENT_SECONDS_ELAPSED'
const incrementSecondsElapsed = createAction(INCREMENT_SECONDS_ELAPSED, _id => ({ _id }))

const SAVE_START_TIME = 'SAVE_START_TIME'
const saveStartTime = createAction(SAVE_START_TIME, _id => ({ _id }))

const SAVE_END_TIME = 'SAVE_END_TIME'
const saveEndTime = createAction(
  SAVE_END_TIME,
  (_id, end) => ({ _id, end }),
)

const CHANGE_RUNNING_ID = 'CHANGE_RUNNING_ID'
const changeRunningId = createAction(CHANGE_RUNNING_ID, _id => ({ _id }))


export {
  SET_API, setAPI,
  FETCH_TODAY_DATA, fetchTodayData,
  SET_ISLOADING, setIsLoading,
  CHANGE_TAB, changeTab,
  LOAD_USERS_DATA, loadUsersData,
  LOAD_LOGS_DATA, loadLogsData,
  TOGGLE_EXPANDED, toggleExpanded,
  CHANGE_POPOVER_STAGE, changePopoverStage,
  ADD_LOG, addLog,
  ADD_CUSTOM_LOG, addCustomLog,
  ADD_LOG_TO_NEXT_DAY, addLogToNextDay,
  RESTORE_LOG, restoreLog,
  DELETE_LOG, deleteLog,
  SET_SECONDS_ELAPSED, setSecondsElapsed,
  INCREMENT_SECONDS_ELAPSED, incrementSecondsElapsed,
  SAVE_START_TIME, saveStartTime,
  SAVE_END_TIME, saveEndTime,
  CHANGE_RUNNING_ID, changeRunningId,
}
