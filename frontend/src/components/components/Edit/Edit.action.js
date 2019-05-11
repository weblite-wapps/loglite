// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

// actions
export const INSERT_LOG = 'INSERT_LOG'
export const insertLog = createAction(INSERT_LOG)
export const dispatchInsertLog = (...args) => dispatch(insertLog(...args))

export const SUBMIT_EDIT = 'SUBMIT_EDIT'
export const submitEdit = createAction(SUBMIT_EDIT)
export const dispatchSubmitEdit = (...args) => dispatch(submitEdit(...args))

export const CHANGE_EDIT_START_TIME = 'CHANGE_EDIT_START_TIME'
export const changeEditStartTime = createAction(CHANGE_EDIT_START_TIME)
export const dispatchChangeEditStartTime = (...args) =>
  dispatch(changeEditStartTime(...args))

export const CHANGE_EDIT_END_TIME = 'CHANGE_EDIT_END_TIME'
export const changeEditEndTime = createAction(CHANGE_EDIT_END_TIME)
export const dispatchChangeEditEndTime = (...args) =>
  dispatch(changeEditEndTime(...args))

export const CHANGE_EDIT_TITLE = 'CHANGE_EDIT_TITLE'
export const changeEditTitle = createAction(CHANGE_EDIT_TITLE)
export const dispatchChangeEditTitle = (...args) =>
  dispatch(changeEditTitle(...args))

export const CLOSE_EDIT = 'CLOSE_EDIT'
export const closeEdit = createAction(CLOSE_EDIT)
export const dispatchCloseEdit = (...args) => dispatch(closeEdit(...args))

export const CHANGE_TITLE_IS_ERROR = 'CHANGE_TITLE_IS_ERROR'
export const changeTitleIsError = createAction(CHANGE_TITLE_IS_ERROR)
export const dispatchChangeTitleIsError = (...args) =>
  dispatch(changeTitleIsError(...args))
