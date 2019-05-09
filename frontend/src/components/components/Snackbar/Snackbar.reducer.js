import * as R from 'ramda'
import { getState } from '../../../setup/redux'
// actions
import { CHANGE_SNACKBAR_STAGE } from './Snackbar.action'

// state
const initialState = {
  snackbarIsOpen: false,
  message: '',
}
//views
export const snackbarIsOpenView = () =>
  R.path(['Snackbar', 'snackbarIsOpen'])(getState())
export const messageView = () => R.path(['Snackbar', 'message'])(getState())
// reducers
const reducers = {
  [CHANGE_SNACKBAR_STAGE]: (state, message) => ({
    ...state,
    snackbarIsOpen: !!message,
    message,
  }),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
