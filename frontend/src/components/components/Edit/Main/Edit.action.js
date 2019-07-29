// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../../setup/redux'

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

export const REMOVE_INTERVAL = 'REMOVE_INTERVAL'
export const removeInterval = createAction(REMOVE_INTERVAL)
export const dispatchRemoveInterval = (...args) =>
  dispatch(removeInterval(...args))

export const CHANGE_EDIT_POPOVER_ID = 'CHANGE_EDIT_POPOVER_ID'
export const changeEditPopOverId = createAction(CHANGE_EDIT_POPOVER_ID)
export const dispatchChangeEditPopOverId = (...args) =>
  dispatch(changeEditPopOverId(...args))

export const CHANGE_EDIT_ANCHOR_EL = 'CHANGE_EDIT_ANCHOR_EL'
export const changeEditAnchorEl = createAction(CHANGE_EDIT_ANCHOR_EL)
export const dispatchChangeEditAnchorEl = (...args) =>
  dispatch(changeEditAnchorEl(...args))

export const CHANGE_IS_OPEN_DIALOG = 'CHANGE_IS_OPEN_DIALOG'
export const changeIsOpenDialog = createAction(CHANGE_IS_OPEN_DIALOG)
export const dispatchChangeIsOpenDialog = (...args) =>
  dispatch(changeIsOpenDialog(...args))

export const SET_TAG_QUERY_IN_EDIT = 'SET_TAG_QUERY_IN_EDIT'
export const setTagQueryInEdit = createAction(SET_TAG_QUERY_IN_EDIT)
export const dispatchSetTagQueryInEdit = (...args) =>
  dispatch(setTagQueryInEdit(...args))

export const CHANGE_SELECTED_TAGS_IN_EDIT = 'CHANGE_SELECTED_TAGS_IN_EDIT'
export const changeSelectedTagsInEdit = createAction(
  CHANGE_SELECTED_TAGS_IN_EDIT,
)
export const dispatchChangeSelectedTagsInEdit = (...args) =>
  dispatch(changeSelectedTagsInEdit(...args))

export const HANDLE_ADD_TAG_IN_EDIT = 'HANDLE_ADD_TAG_IN_EDIT'
export const handleAddTagInEdit = createAction(HANDLE_ADD_TAG_IN_EDIT)
export const dispatchHandleAddTagInEdit = (...args) =>
  dispatch(handleAddTagInEdit(...args))
