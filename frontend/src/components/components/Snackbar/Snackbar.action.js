// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

// actions
export const CHANGE_SNACKBAR_STAGE = 'CHANGE_SNACKBAR_STAGE'
const changeSnackbarStage = createAction(CHANGE_SNACKBAR_STAGE)
export const dispatchChangeSnackbarStage = (...args) =>
  dispatch(changeSnackbarStage(...args))
