// modules
import * as R from 'ramda'
import format from 'date-fns/format'
// helpers
import { formatTime } from './App.helper'
// actions
import {
  SET_ISLOADING,
  CHANGE_TAB,
  LOAD_LOGS_DATA,
  TOGGLE_EXPANDED,
  ADD_LOG,
  ADD_CUSTOM_LOG,
  ADD_LOG_TO_NEXT_DAY,
  RESTORE_LOG,
  RESTORE_CUSTOM_LOG,
  DELETE_LOG,
  SAVE_START_TIME,
  SAVE_END_TIME,
  TOGGLE_IS_RUNNING,
} from './App.action'

// state
const initialState = {
  tabIndex: 'Home',
  isLoading: false,
  isRunning: false,
  logs: [],
  wis: (window.W && window.W.id) || '110',
}

// lens & views
const isLoadingLens = R.lensProp('isLoading')
const tabIndexLens = R.lensProp('tabIndex')
const endLens = R.lensProp('end')
const isRunningLens = R.lensProp('isRunning')

// reducers
const reducers = {
  [SET_ISLOADING]: (state, { value }) => R.set(isLoadingLens, value)(state),

  [CHANGE_TAB]: (state, { value }) => R.set(tabIndexLens, value, state),

  [LOAD_LOGS_DATA]: (state, { logs }) => ({ ...state,
    logs: R.concat(state.logs, R.map(log => ({ ...log, expanded: false }), logs)),
  }),

  [TOGGLE_EXPANDED]: (state, { _id }) => ({ ...state,
    logs: R.map(log => (log._id === _id) ? { ...log, expanded: !log.expanded } : log, state.logs),
  }),

  [ADD_LOG]: (state, { title, tags }) => ({ ...state,
    logs: R.prepend(
      {
        _id: state.logs.length,
        title,
        expanded: false,
        tags,
        times: [],
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
            tags,
            times: [{ start, end }],
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
        tags,
        times: [{ start: formatTime('00:00'), end }],
        date,
        wis: state.wis,
      }, state.logs),
  }),

  [RESTORE_LOG]: (state, { log }) => ({ ...state,
    logs: R.adjust(R.assoc('_id', log._id), 0, state.logs),
  }),

  [RESTORE_CUSTOM_LOG]: (state, { log }) => ({ ...state,
    logs: R.adjust(R.assoc('_id', log._id), 0, state.logs),
  }),

  [DELETE_LOG]: (state, { _id }) => ({ ...state,
    logs: R.remove(R.findIndex(R.propEq('_id', _id))(state.logs), 1, state.logs),
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

  [TOGGLE_IS_RUNNING]: state => R.set(isRunningLens, !state.isRunning, state),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
