// modules
import * as R from 'ramda'
import format from 'date-fns/format'
// helpers
import { formatTime } from './App.helper'
// actions
import {
  SET_API,
  SET_ISLOADING,
  CHANGE_TAB,
  LOAD_USERS_DATA,
  LOAD_LOGS_DATA,
  TOGGLE_EXPANDED,
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
} from './App.action'

// state
const initialState = {
  tabIndex: 'Home',
  isLoading: false,
  runningId: '',
  logs: [],
  users: [],
  user: null,
  wis: (window.W && window.W.id) || '110',
  creator: null,
}

// lens & views
const isLoadingLens = R.lensProp('isLoading')
const tabIndexLens = R.lensProp('tabIndex')
const endLens = R.lensProp('end')
const runningIdLens = R.lensProp('runningId')
const secondsElapsedLens = R.lensProp('secondsElapsed')

// reducers
const reducers = {
  [SET_API]: (state, { user, creator }) => ({ ...state, user, creator }),

  [SET_ISLOADING]: (state, { value }) => R.set(isLoadingLens, value)(state),

  [CHANGE_TAB]: (state, { value }) => R.set(tabIndexLens, value, state),

  [LOAD_USERS_DATA]: (state, { users }) => ({ ...state,
    users: R.concat(state.users, users),
  }),

  [LOAD_LOGS_DATA]: (state, { logs }) => ({ ...state,
    logs: R.concat(state.logs,
      R.map(log => ({ ...log,
        expanded: false,
        secondsElapsed: 0,
        popoverIsOpen: false,
      }), logs)),
  }),

  [TOGGLE_EXPANDED]: (state, { _id }) => ({ ...state,
    logs: R.map(log => (log._id === _id) ? { ...log, expanded: !log.expanded } : log, state.logs),
  }),

  [CHANGE_POPOVER_STAGE]: (state, { _id, value }) => ({ ...state,
    logs: R.map(log => (log._id === _id) ? { ...log, popoverIsOpen: value } : log, state.logs),
  }),

  [ADD_LOG]: (state, { title, tags }) => ({ ...state,
    logs: R.prepend(
      {
        _id: state.logs.length,
        title,
        expanded: false,
        popoverIsOpen: false,
        tags,
        times: [],
        secondsElapsed: 0,
        date: format(new Date(), 'YYYY-MM-DD'),
        wis: state.wis,
      },
      state.logs),
  }),

  [ADD_CUSTOM_LOG]: (state, { title, tags, date, start, end }) =>
    date === format(new Date(), 'YYYY-MM-DD') ?
      ({ ...state,
        logs: R.prepend(
          {
            _id: state.logs.length,
            title,
            expanded: false,
            popoverIsOpen: false,
            tags,
            times: [{ start: formatTime(start), end: formatTime(end) }],
            secondsElapsed: 0,
            date,
            wis: state.wis,
          }, state.logs),
      }) : state,

  [ADD_LOG_TO_NEXT_DAY]: (state, { title, tags, end, date }) => ({ ...state,
    logs: R.prepend(
      {
        _id: state.logs.length,
        title,
        expanded: false,
        popoverIsOpen: false,
        tags,
        times: [{ start: formatTime('00:00'), end }],
        secondsElapsed: 0,
        date,
        wis: state.wis,
      }, state.logs),
  }),

  [RESTORE_LOG]: (state, { log }) => ({ ...state,
    logs: R.adjust(R.assoc('_id', log._id), 0, state.logs),
  }),

  [DELETE_LOG]: (state, { _id }) => ({ ...state,
    logs: R.remove(R.findIndex(R.propEq('_id', _id))(state.logs), 1, state.logs),
  }),

  [SET_SECONDS_ELAPSED]: (state, { _id, value }) => ({ ...state,
    logs: R.map(log => (log._id === _id) ?
      R.set(secondsElapsedLens, value, log) : log, state.logs),
  }),

  [INCREMENT_SECONDS_ELAPSED]: (state, { _id }) => ({ ...state,
    logs: R.map(log => (log._id === _id) ?
      R.set(secondsElapsedLens, R.inc(log.secondsElapsed), log) : log, state.logs),
  }),

  [SAVE_START_TIME]: (state, { _id }) => ({ ...state,
    logs: R.map(log => (log._id === _id) ?
      { ...log, times: R.append({ start: new Date(), end: 'running' }, log.times) } : log, state.logs),
  }),

  [SAVE_END_TIME]: (state, { _id, end }) => ({ ...state,
    logs: R.map(log => (log._id === _id) ?
      { ...log,
        times: R.map(time => (time.end === 'running') ?
          R.set(endLens, end, time) : time, log.times) } : log, state.logs),
  }),

  [CHANGE_RUNNING_ID]: (state, { _id }) => R.set(runningIdLens, _id, state),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
