// modules
import * as R from 'ramda'
// actions
import {
  CHANGE_DATE,
  CHANGE_START_TIME,
  CHANGE_END_TIME,
  LOAD_TAGS_DATA_IN_ADD,
  CHANGE_TITLE,
  SET_QUERY_IN_ADD,
  FETCH_TAGS_IN_ADD,
  ADD_TAG_IN_ADD,
  CHANGE_SELECTED_TAGS_IN_ADD,
  RESET_INPUTS,
} from './Add.action'

// state
const initialState = {
  title: '',
  queryTag: '',
  suggestions: [],
  date: '',
  startTime: '',
  endTime: '',
  selectedTags: [],
  tags: [],
}


// lens
const dateLens = R.lensProp('date')
const startTimeLens = R.lensProp('startTime')
const endTimeLens = R.lensProp('endTime')
const titleLens = R.lensProp('title')
const queryTagLens = R.lensProp('queryTag')
const suggestionsLens = R.lensProp('suggestions')


// reducers
const reducers = {
  [CHANGE_DATE]: (state, { value }) => R.set(dateLens, value, state),

  [CHANGE_START_TIME]: (state, { value }) => R.set(startTimeLens, value, state),

  [CHANGE_END_TIME]: (state, { value }) => R.set(endTimeLens, value, state),

  [LOAD_TAGS_DATA_IN_ADD]: (state, { tags }) => ({ ...state,
    tags: R.map(tag => R.assoc('isSelected', false, tag), tags),
  }),

  [CHANGE_TITLE]: (state, { value }) => R.set(titleLens, value, state),

  [SET_QUERY_IN_ADD]: (state, { queryTag }) => R.set(queryTagLens, queryTag)(state),

  [FETCH_TAGS_IN_ADD]: (state, { tags }) => R.set(suggestionsLens, tags, state),

  [ADD_TAG_IN_ADD]: state => ({ ...state,
    selectedTags: R.append(R.toLower(state.queryTag), state.selectedTags),
    tags: R.append(
      { label: R.toLower(state.queryTag),
        _id: state.tags.length,
        isSelected: true },
      state.tags),
    queryTag: '',
  }),

  [CHANGE_SELECTED_TAGS_IN_ADD]: (state, { tag }) => ({ ...state,
    selectedTags: tag.isSelected ?
      R.remove(R.indexOf(tag.label, state.selectedTags), 1, state.selectedTags) :
      R.append(tag.label, state.selectedTags),
    tags: R.map(eachTag => (eachTag._id === tag._id) ?
      { ...eachTag, isSelected: !eachTag.isSelected } : eachTag, state.tags),
  }),

  [RESET_INPUTS]: state =>
    ({ ...state,
      startTime: '',
      endTime: '',
      date: '',
      title: '',
      selectedTags: [],
      queryTag: '',
    }),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
