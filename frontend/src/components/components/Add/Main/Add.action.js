// modules
import { createAction } from 'redux-actions'


// actions
const SET_QUERY_IN_ADD = 'SET_QUERY_IN_ADD'
const setQueryInAdd = createAction(SET_QUERY_IN_ADD, queryTag => ({ queryTag }))

const FETCH_TAGS_IN_ADD = 'FETCH_TAGS_IN_ADD'
const fetchTagsInAdd = createAction(FETCH_TAGS_IN_ADD, tags => ({ tags }))

const CHANGE_DATE = 'CHANGE_DATE'
const changeDate = createAction(CHANGE_DATE, value => ({ value }))

const CHANGE_START_TIME = 'CHANGE_START_TIME'
const changeStartTime = createAction(CHANGE_START_TIME, value => ({ value }))

const CHANGE_END_TIME = 'CHANGE_END_TIME'
const changeEndTime = createAction(CHANGE_END_TIME, value => ({ value }))

const LOAD_TAGS_DATA_IN_ADD = 'LOAD_TAGS_DATA_IN_ADD'
const loadTagsDataInAdd = createAction(LOAD_TAGS_DATA_IN_ADD, tags => ({ tags }))

const CHANGE_INPUT_NAME = 'CHANGE_INPUT_NAME'
const changeInputName = createAction(CHANGE_INPUT_NAME, value => ({ value }))

const ADD_TAG_IN_ADD = 'ADD_TAG_IN_ADD'
const addTagInAdd = createAction(ADD_TAG_IN_ADD)

const CHANGE_SELECTED_TAGS_IN_ADD = 'CHANGE_SELECTED_TAGS_IN_ADD'
const changeSelectedTagsInAdd = createAction(CHANGE_SELECTED_TAGS_IN_ADD, tag => ({ tag }))

const RESET_INPUTS = 'RESET_INPUTS'
const resetInputs = createAction(RESET_INPUTS)


export {
  SET_QUERY_IN_ADD, setQueryInAdd,
  FETCH_TAGS_IN_ADD, fetchTagsInAdd,
  CHANGE_DATE, changeDate,
  CHANGE_START_TIME, changeStartTime,
  CHANGE_END_TIME, changeEndTime,
  LOAD_TAGS_DATA_IN_ADD, loadTagsDataInAdd,
  CHANGE_INPUT_NAME, changeInputName,
  ADD_TAG_IN_ADD, addTagInAdd,
  CHANGE_SELECTED_TAGS_IN_ADD, changeSelectedTagsInAdd,
  RESET_INPUTS, resetInputs,
}
