// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

// actions
export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'
export const toggleEditMode = createAction(
  TOGGLE_EDIT_MODE,
  (log, isEditMode) => ({
    log,
    isEditMode,
  }),
)
export const dispatchToggleEditMode = (...args) =>
  dispatch(toggleEditMode(...args))

export const UPDATE_LOG = 'UPDATE_LOG'
export const updateLog = createAction(UPDATE_LOG)
export const dispatchUpdateLog = (...args) => dispatch(updateLog(...args))

export const CHANGE_EDIT_START_TIME = 'CHANGE_EDIT_START_TIME'
export const changeEditStartTime = createAction(
  CHANGE_EDIT_START_TIME,
  (value, id) => ({
    value,
    id,
  }),
)
export const dispatchChangeEditStartTime = (...args) =>
  dispatch(changeEditStartTime(...args))

export const CHANGE_EDIT_END_TIME = 'CHANGE_EDIT_END_TIME'
export const changeEditEndTime = createAction(
  CHANGE_EDIT_END_TIME,
  (value, id) => ({
    value,
    id,
  }),
)
export const dispatchChangeEditEndTime = (...args) =>
  dispatch(changeEditEndTime(...args))
