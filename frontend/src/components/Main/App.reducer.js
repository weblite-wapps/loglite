// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../setup/redux'
// helpers
import { formatTime } from './App.helper'
import { formattedDate } from '../../helper/functions/date.helper'
// actions
import {
  SET_API,
  SET_ISLOADING,
  CHANGE_TAB,
  LOAD_USERS_DATA,
  LOAD_LOGS_DATA,
  CHANGE_POPOVER_STAGE,
  ADD_LOG,
  ADD_CUSTOM_LOG,
  ADD_LOG_TO_NEXT_DAY,
  RESTORE_LOG,
  DELETE_LOG,
  SET_SECONDS_ELAPSED,
  INCREMENT_SECONDS_ELAPSED,
  SAVE_START_TIME,
  SAVE_END_TIME,
  CHANGE_RUNNING_ID,
  CHANGE_EXPANDING_ID,
} from './App.action'

// state
const initialState = {
  tabIndex: 'Home',
  isLoading: false,
  popoverIsOpen: false,
  expandingId: '',
  runningId: '',
  secondsElapsed: 0,
  logs: [],
  users: [],
  user: {},
  wis: (window.W && window.W.wisId) || '110',
  creator: false,
}

// lens
const isLoadingLens = R.lensProp('isLoading')
const tabIndexLens = R.lensProp('tabIndex')
const endLens = R.lensProp('end')
const runningIdLens = R.lensProp('runningId')
const expandingIdLens = R.lensProp('expandingId')
const secondsElapsedLens = R.lensProp('secondsElapsed')
const popoverIsOpenLens = R.lensProp('popoverIsOpen')
// views
export const wisView = () => R.path(['App', 'wis'])(getState())
export const creatorView = () => R.path(['App', 'creator'])(getState())
export const userIdView = () => R.path(['App', 'user', 'id'])(getState())
export const userNameView = () => R.path(['App', 'user', 'name'])(getState())


// reducers
const reducers = {
  [SET_API]: (state, { user, creator }) => ({ ...state, user, creator }),

  [SET_ISLOADING]: (state, { value }) => R.set(isLoadingLens, value, state),

  [CHANGE_TAB]: (state, { value }) => R.set(tabIndexLens, value, state),

  [LOAD_USERS_DATA]: (state, { users }) =>
    ({ ...state, users: R.uniq(R.concat(state.users, users)) }),

  [LOAD_LOGS_DATA]: (state, { logs }) => ({ ...state, logs: R.concat(state.logs, logs) }),

  [CHANGE_EXPANDING_ID]: (state, { _id }) => R.set(expandingIdLens, _id, state),

  [CHANGE_POPOVER_STAGE]: (state, { value }) => R.set(popoverIsOpenLens, value, state),

  [ADD_LOG]: (state, { title, tags }) => ({
    ...state,
    logs: R.prepend(
      {
        _id: state.logs.length,
        title,
        tags,
        times: [],
        date: formattedDate(new Date()),
        wis: state.wis,
      },
      state.logs),
  }),

  [ADD_CUSTOM_LOG]: (state, { title, tags, date, start, end }) =>
    date === formattedDate(new Date()) ?
      ({ ...state,
        logs: R.prepend(
          {
            _id: state.logs.length,
            title,
            tags,
            times: [{ start: formatTime(start), end: formatTime(end) }],
            date,
            wis: state.wis,
          }, state.logs),
      }) : state,

  [ADD_LOG_TO_NEXT_DAY]: (state, { title, tags, end, date }) => ({
    ...state,
    logs: R.prepend(
      {
        _id: state.logs.length,
        title,
        tags,
        times: [{ start: formatTime('00:00'), end }],
        date,
        wis: state.wis,
      }, state.logs),
  }),

  [RESTORE_LOG]: (state, { log }) => ({
    ...state,
    logs: R.adjust(R.assoc('_id', log._id), 0, state.logs),
  }),

  [DELETE_LOG]: (state, { _id }) => ({
    ...state,
    logs: R.remove(R.findIndex(R.propEq('_id', _id))(state.logs), 1, state.logs),
  }),

  [SET_SECONDS_ELAPSED]: (state, { value }) => R.set(secondsElapsedLens, value, state),

  [INCREMENT_SECONDS_ELAPSED]: state =>
    R.set(secondsElapsedLens, R.inc(state.secondsElapsed), state),

  [SAVE_START_TIME]: (state, { _id }) => ({
    ...state,
    logs: R.map(log => (log._id === _id) ?
      { ...log, times: R.append({ start: new Date(), end: 'running' }, log.times) } : log, state.logs),
  }),

  [SAVE_END_TIME]: (state, { _id, end }) => ({
    ...state,
    logs: R.map(log => (log._id === _id) ?
      {
        ...log,
        times: R.map(time => (time.end === 'running') ?
          R.set(endLens, end, time) : time, log.times),
      } : log, state.logs),
  }),

  [CHANGE_RUNNING_ID]: (state, { _id }) => R.set(runningIdLens, _id, state),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
