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
  CHANGE_SELECTED_TAGS_IN_EDIT,
  UPDATE_TAGS_DATA_IN_EDIT,
  LOAD_TAGS_DATA_IN_EDIT,
  FETCH_TAGS_IN_EDIT,
  ADD_TAG_IN_EDIT,
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
  suggestions: [],
  queryTag: '',
  tags: [],
}

const queryTagLens = R.lensProp('queryTag')
const suggestionsLens = R.lensProp('suggestions')

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
        date: R.prop('date', log),
        start: getCurrentTime(start),
        end: end === 'running' ? end : getCurrentTime(end),
      }),
      R.prop('times', log),
    ),
    title: R.prop('title', log),
    selectedTags: R.prop('tags', log),
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

  [LOAD_TAGS_DATA_IN_EDIT]: (state, { tags }) => ({
    ...state,
    tags: R.map(tag => R.assoc('isSelected', false, tag), tags),
  }),

  [UPDATE_TAGS_DATA_IN_EDIT]: (state, { tags }) => ({
    ...state,
    tags: R.map(
      tag => R.assoc('isSelected', R.includes(tag.label, tags), tag),
      state.tags,
    ),
  }),

  [FETCH_TAGS_IN_EDIT]: (state, { tags }) =>
    R.set(suggestionsLens, tags, state),

  [SET_TAG_QUERY_IN_EDIT]: (state, queryTag) =>
    R.set(queryTagLens, queryTag)(state),

  [ADD_TAG_IN_EDIT]: state =>
    !R.includes(state.queryTag, state.selectedTags)
      ? {
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
        }
      : state,

  [CHANGE_SELECTED_TAGS_IN_EDIT]: (state, tag) => ({
    ...state,
    selectedTags: tag.isSelected
      ? R.remove(
          R.indexOf(tag.label, state.selectedTags),
          1,
          state.selectedTags,
        )
      : R.append(tag.label, state.selectedTags),
    tags: R.map(
      eachTag =>
        eachTag._id === tag._id
          ? {
              ...eachTag,
              isSelected: !eachTag.isSelected,
            }
          : eachTag,
      state.tags,
    ),
  }),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
