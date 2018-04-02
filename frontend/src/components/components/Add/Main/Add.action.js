// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../../setup/redux'


// actions
export const SET_QUERY_IN_ADD = 'SET_QUERY_IN_ADD'
export const setQueryInAdd = createAction(SET_QUERY_IN_ADD, queryTag => ({ queryTag }))
export const dispatchSetQueryInAdd = (...args) => dispatch(setQueryInAdd(...args))

export const FETCH_TAGS_IN_ADD = 'FETCH_TAGS_IN_ADD'
export const fetchTagsInAdd = createAction(FETCH_TAGS_IN_ADD, tags => ({ tags }))
export const dispatchFetchTagsInAdd = (...args) => dispatch(fetchTagsInAdd(...args))

export const CHANGE_DATE = 'CHANGE_DATE'
export const changeDate = createAction(CHANGE_DATE, value => ({ value }))
export const dispatchChangeDate = (...args) => dispatch(changeDate(...args))

export const CHANGE_START_TIME = 'CHANGE_START_TIME'
export const changeStartTime = createAction(CHANGE_START_TIME, value => ({ value }))
export const dispatchChangeStartTime = (...args) => dispatch(changeStartTime(...args))

export const CHANGE_END_TIME = 'CHANGE_END_TIME'
export const changeEndTime = createAction(CHANGE_END_TIME, value => ({ value }))
export const dispatchChangeEndTime = (...args) => dispatch(changeEndTime(...args))

export const LOAD_TAGS_DATA_IN_ADD = 'LOAD_TAGS_DATA_IN_ADD'
export const loadTagsDataInAdd = createAction(LOAD_TAGS_DATA_IN_ADD, tags => ({ tags }))
export const dispatchLoadTagsDataInAdd = (...args) => dispatch(loadTagsDataInAdd(...args))

export const CHANGE_TITLE = 'CHANGE_TITLE'
export const changeTitle = createAction(CHANGE_TITLE, value => ({ value }))
export const dispatchChangeTitle = (...args) => dispatch(changeTitle(...args))

export const ADD_TAG_IN_ADD = 'ADD_TAG_IN_ADD'
export const addTagInAdd = createAction(ADD_TAG_IN_ADD)
export const dispatchAddTagInAdd = (...args) => dispatch(addTagInAdd(...args))

export const CHANGE_SELECTED_TAGS_IN_ADD = 'CHANGE_SELECTED_TAGS_IN_ADD'
export const changeSelectedTagsInAdd = createAction(CHANGE_SELECTED_TAGS_IN_ADD, tag => ({ tag }))
export const dispatchChangeSelectedTagsInAdd = (...args) =>
  dispatch(changeSelectedTagsInAdd(...args))

export const RESET_INPUTS = 'RESET_INPUTS'
export const resetInputs = createAction(RESET_INPUTS)
export const dispatchResetInputs = (...args) => dispatch(resetInputs(...args))

export const TOGGLE_EXPANDED = 'TOGGLE_EXPANDED'
export const toggleExpanded = createAction(TOGGLE_EXPANDED)
export const dispatchToggleExpanded = (...args) => dispatch(toggleExpanded(...args))
