// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../../setup/redux'
// helpers
import { getCurrentTime } from '../../../../helper/functions/time.helper'
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
  SET_TAG_QUERY_IN_EDIT,
  HANDLE_ADD_TAG_IN_EDIT,
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
  selectedTags: [],
  queryTag: '',
  tags: [],
}

const queryTagLens = R.lensProp('queryTag')

// views
export const logView = () => R.path(['Edit', 'log'])(getState())
export const timesView = () => R.path(['Edit', 'times'])(getState())
export const titleView = () => R.path(['Edit', 'title'])(getState())
export const isErrorView = () => R.path(['Edit', 'isError'])(getState())
export const anchorElView = () => R.path(['Edit', 'anchorEl'])(getState())
export const popoverIdView = () => R.path(['Edit', 'popoverId'])(getState())
export const isOpenDialogView = () =>
  R.path(['Edit', 'isOpenDialog'])(getState())
export const selectedTagsView = () =>
  R.path(['Edit', 'selectedTags'])(getState())
export const queryTagView = () => R.path(['Edit', 'queryTag'])(getState())
export const tagsView = () => R.path(['Edit', 'tags'])(getState())

// reducers
const reducers = {
  [INSERT_LOG]: (state, log) => ({
    ...state,
    log,
    times: R.map(
      ({ _id, start, end }) => ({
        _id,
        start: getCurrentTime(start),
        end: end === 'running' ? end : getCurrentTime(end),
      }),
      R.prop('times', log),
    ),
    title: R.prop('title', log),
    tags: R.prop('tags', log),
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

  [SET_TAG_QUERY_IN_EDIT]: (state, queryTag) =>
    R.set(queryTagLens, queryTag)(state),

  [HANDLE_ADD_TAG_IN_EDIT]: state => ({
    ...state,
    selectedTags: R.append(R.toLower(state.queryTag), state.selectedTags),
    tags: R.append(
      {
        label: R.toLower(state.queryTag),
        _id: state.tags.length,
        isSelected: true,
      },
      state.tags,
    ),
    queryTag: '',
  }),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
