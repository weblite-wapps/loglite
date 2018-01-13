// modules
import { createAction } from 'redux-actions'


// actions
const CHANGE_SNACKBAR_STAGE = 'CHANGE_SNACKBAR_STAGE'
const changeSnackbarStage = createAction(
  CHANGE_SNACKBAR_STAGE,
  (value, message) => ({ value, message }),
)


export {
  CHANGE_SNACKBAR_STAGE, changeSnackbarStage,
}
