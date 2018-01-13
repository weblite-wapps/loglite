// actions
import {
  CHANGE_SNACKBAR_STAGE,
} from './Snackbar.action'

// state
const initialState = {
  snackbarIsOpen: false,
  message: '',
}


// reducers
const reducers = {
  [CHANGE_SNACKBAR_STAGE]: (state, { value, message }) => ({ ...state,
    snackbarIsOpen: value,
    message,
  }),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
