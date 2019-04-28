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
