// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

// actions
export const INSERT_LOG = 'INSERT_LOG'
export const insertLog = createAction(INSERT_LOG, log => ({
  log,
}))
export const dispatchInsertLog = (...args) => dispatch(insertLog(...args))

export const UPDATE_LOG = 'UPDATE_LOG'
export const updateLog = createAction(UPDATE_LOG, value => value)
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
