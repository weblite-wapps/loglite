// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../setup/redux'
// helpers
import { getCurrentTime } from '../../../helper/functions/time.helper'
// actions
import {
  INSERT_LOG,
  CHANGE_EDIT_START_TIME,
  CHANGE_EDIT_END_TIME,
  CHANGE_EDIT_TITLE,
  CHANGE_TITLE_IS_ERROR,
} from './Edit.action'

// state
const initialState = {
  log: {},
  times: [],
  title: '',
  isError: { title: false },
}

// views
export const logView = () => R.path(['Edit', 'log'])(getState())
export const timesView = () => R.path(['Edit', 'times'])(getState())
export const titleView = () => R.path(['Edit', 'title'])(getState())
export const isErrorView = () => R.path(['Edit', 'isError'])(getState())

// reducers
const reducers = {
  [INSERT_LOG]: (state, log) => ({
    ...state,
    log,
    times: R.map(
      ({ _id, start, end }) => ({
        _id,
        start: getCurrentTime(start),
        end: getCurrentTime(end),
      }),
      R.prop('times', log),
    ),
    title: R.prop('title', log),
  }),

  [CHANGE_EDIT_START_TIME]: (state, { value, id }) => ({
    ...state,
    times: R.map(
      time => (time._id === id ? { ...time, start: value } : time),
      state.times,
    ),
  }),

  [CHANGE_EDIT_END_TIME]: (state, { value, id }) => ({
    ...state,
    times: R.map(
      time => (time._id === id ? { ...time, end: value } : time),
      state.times,
    ),
  }),

  [CHANGE_EDIT_TITLE]: (state, title) => ({
    ...state,
    title,
  }),
  [CHANGE_TITLE_IS_ERROR]: (state, value) => ({
    ...state,
    isError: {
      ...state.isError,
      title: value,
    },
  }),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
