// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../../setup/redux'
// actions
import {
  CHANGE_TEXT_SLIDER,
  LOAD_TOTAL_DURATIONS,
  SET_SECONDS_ELAPSED,
  INCREMENT_SECONDS_ELAPSED,
  CHANGE_RUNNING_ID,
} from './Home.action'
// helpers
import { NextName, NextDuration } from './Home.helper'
// state
const initialState = {
  textSlider: { name: 'Today', duration: '' },
  homeTotalDuration: { today: '', thisWeek: '', thisMonth: '' },
  secondsElapsed: 0,
  runningId: '',
}

// lenses
const durationLens = R.lensProp('duration')
const secondsElapsedLens = R.lensProp('secondsElapsed')
const runningIdLens = R.lensProp('runningId')
// views
export const textSliderView = () => R.path(['Home', 'textSlider'])(getState())
export const secondsElapsedView = () => R.path(['Home', 'secondsElapsed'])(getState())
export const runningIdView = () => R.path(['Home', 'runningId'])(getState())

// reducers
const reducers = {
  [CHANGE_TEXT_SLIDER]: (state, { value }) => ({ ...state,
    textSlider: {
      name: NextName(state.textSlider.name, value),
      duration: state.homeTotalDuration[NextDuration(state.textSlider.name, value)],
    },
  }),

  [LOAD_TOTAL_DURATIONS]: (state, { totalDurations }) => ({
    ...state,
    homeTotalDuration: totalDurations,
    textSlider: R.set(durationLens, totalDurations.today, state.textSlider),
  }),

  [SET_SECONDS_ELAPSED]: (state, { value }) => R.set(secondsElapsedLens, value, state),

  [INCREMENT_SECONDS_ELAPSED]: state =>
    R.set(secondsElapsedLens, R.inc(state.secondsElapsed), state),

  [CHANGE_RUNNING_ID]: (state, { _id }) => R.set(runningIdLens, _id, state),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
