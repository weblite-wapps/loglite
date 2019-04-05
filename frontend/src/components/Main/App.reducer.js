// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../setup/redux'
// actions
import {
  SET_API,
  SET_ISLOADING,
  CHANGE_TAB,
  LOAD_USERS_DATA,
  LOAD_LOGS_DATA,
  LOAD_PINNED_LOGS,
  CHANGE_POPOVER_ID,
  ADD_LOG,
  DELETE_LOG,
  SAVE_START_TIME,
  SAVE_END_TIME,
  TOGGLE_IS_PINNED,
  SET_ABOUT_MODE,
} from './App.action'

// state
const initialState = {
  tabIndex: 'Home',
  aboutMode: false,
  isLoading: false,
  popoverId: '',
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
const popoverIdLens = R.lensProp('popoverId')
const aboutModeLens = R.lensProp('aboutMode')
// views
export const wisView = () => R.path(['App', 'wis'])(getState())
export const creatorView = () => R.path(['App', 'creator'])(getState())
export const userIdView = () => R.path(['App', 'user', 'id'])(getState())
export const userNameView = () => R.path(['App', 'user', 'name'])(getState())
export const logsView = () => R.path(['App', 'logs'])(getState())
export const usersView = () => R.path(['App', 'users'])(getState())
export const popoverIdView = () => R.path(['App', 'popoverId'])(getState())
export const isLoadingView = () => R.path(['App', 'isLoading'])(getState())
export const tabIndexView = () => R.path(['App', 'tabIndex'])(getState())
export const aboutModeView = () => R.path(['App', 'aboutMode'])(getState())

// reducers
const reducers = {
  [SET_API]: (state, { user, creator }) => ({ ...state, user, creator }),

  [SET_ISLOADING]: (state, { value }) => R.set(isLoadingLens, value, state),

  [CHANGE_TAB]: (state, { value }) => R.set(tabIndexLens, value, state),

  [LOAD_USERS_DATA]: (state, { users }) =>
    ({ ...state, users: R.uniq(R.concat(state.users, users)) }),

  [LOAD_LOGS_DATA]: (state, { logs }) => ({ ...state, logs: R.uniq(R.concat(state.logs, logs)) }),

  // [LOAD_PINNED_LOGS]: (state, { logs }) => ({ ...state, logs: R.concat(state.logs, R.map(log => ({ _id: Math.random(), title: log.title, tags: log.tags, isPinned: false }), logs)) }),

  [CHANGE_POPOVER_ID]: (state, { value }) => R.set(popoverIdLens, value, state),

  [ADD_LOG]: (state, { log }) => ({
    ...state,
    logs: R.prepend(log, state.logs),
  }),

  [DELETE_LOG]: (state, { _id }) => ({
    ...state,
    logs: R.remove(R.findIndex(R.propEq('_id', _id))(state.logs), 1, state.logs),
  }),

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

  [TOGGLE_IS_PINNED]: (state, { _id, value }) => ({
    ...state,
    logs: R.map(log => (log._id === _id) ?
      { ...log, isPinned: value } : log, state.logs),
  }),

  [SET_ABOUT_MODE]: (state, { value }) => R.set(aboutModeLens, value, state),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
