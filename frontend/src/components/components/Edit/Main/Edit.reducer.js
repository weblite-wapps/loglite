// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../../setup/redux'
// helpers
import {
  getCurrentTime,
  getTimeZone,
} from '../../../../helper/functions/time.helper'
// actions
import {
  INSERT_LOG,
  CHANGE_EDIT_START_TIME,
  CHANGE_EDIT_END_TIME,
  CHANGE_EDIT_TITLE,
  CHANGE_TITLE_IS_ERROR,
  REMOVE_INTERVAL,
  CHANGE_EDIT_POPOVER_ID,
  CHANGE_EDIT_ANCHOR_EL,
  CHANGE_IS_OPEN_DIALOG,
} from './Edit.action'

// state
const initialState = {
  log: {},
  times: [],
  title: '',
  isError: { title: false },
  anchorEl: null,
  popoverId: '',
  isOpenDialog: false,
}

// views
export const logView = () => R.path(['Edit', 'log'])(getState())
export const timesView = () => R.path(['Edit', 'times'])(getState())
export const titleView = () => R.path(['Edit', 'title'])(getState())
export const isErrorView = () => R.path(['Edit', 'isError'])(getState())
export const anchorElView = () => R.path(['Edit', 'anchorEl'])(getState())
export const popoverIdView = () => R.path(['Edit', 'popoverId'])(getState())
export const isOpenDialogView = () =>
  R.path(['Edit', 'isOpenDialog'])(getState())

// reducers
const reducers = {
  [INSERT_LOG]: (state, log) => ({
    ...state,
    log,
    times: R.map(
      ({ _id, start, end }) => ({
        _id,
        date: R.prop('date', log),
        start: getCurrentTime(start),
        end: end === 'running' ? end : getCurrentTime(end),
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

  [REMOVE_INTERVAL]: (state, id) => ({
    ...state,
    times: R.filter(time => time._id !== id, state.times),
  }),

  [CHANGE_EDIT_POPOVER_ID]: (state, value) => ({
    ...state,
    popoverId: value,
  }),

  [CHANGE_EDIT_ANCHOR_EL]: (state, value) => ({
    ...state,
    anchorEl: value,
  }),

  [CHANGE_IS_OPEN_DIALOG]: (state, value) => ({
    ...state,
    isOpenDialog: value,
  }),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
