// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../setup/redux'
// helpers
// actions
import {
  TOGGLE_EDIT_MODE,
  CHANGE_EDIT_START_TIME,
  CHANGE_EDIT_END_TIME,
} from './Edit.action'

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
  [CHANGE_EDIT_START_TIME]: (state, { value, id }) => {
    const index = R.findIndex(
      R.propEq('_id', id),
      R.view(R.lensPath(['log', 'times']), state),
    )
    return R.set(R.lensPath(['log', 'times', index, 'start']), value, state)
  },

  [CHANGE_EDIT_END_TIME]: (state, { value, id }) => {
    const index = R.findIndex(
      R.propEq('_id', id),
      R.view(R.lensPath(['log', 'times']), state),
    )
    return R.set(R.lensPath(['log', 'times', index, 'end']), value, state)
  },
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
