// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../setup/redux'
// helpers
// actions
import { TOGGLE_EDIT_MODE } from './Edit.action'

// state
const initialState = {
  isEditMode: false,
  log: {},
}

// lens
const editModeLens = R.lensProp('isEditMode')
// views
export const editModeView = () => R.path(['Edit', 'isEditMode'])(getState())
export const logView = () => R.path(['Edit', 'log'])(getState())
// reducers
const reducers = {
  [TOGGLE_EDIT_MODE]: (state, { log, isEditMode }) => ({
    ...state,
    log,
    isEditMode,
  }),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
