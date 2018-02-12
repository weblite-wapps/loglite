// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../../setup/redux'
// actions
import {
  CHANGE_TEXT_SLIDER,
  LOAD_TOTAL_DURATIONS,
} from './Home.action'
// helpers
import { NextTextSliderName, NextTextSliderDuration } from './Home.helper'

// state
const initialState = {
  textSlider: { name: 'Today', duration: '' },
  homeTotalDuration: { today: '', thisWeek: '', thisMonth: '' },
}

// lens
const durationLens = R.lensProp('duration')
// views
export const textSliderView = () => R.path(['Home', 'textSlider'])(getState())

// reducers
const reducers = {
  [CHANGE_TEXT_SLIDER]: (state, { value }) => ({ ...state,
    textSlider: {
      name: NextTextSliderName(state.textSlider.name, value),
      // TODO: wtf???
      duration: R.view(R.lensProp(NextTextSliderDuration(state.textSlider.name, value)),
        state.homeTotalDuration),
    },
  }),

  [LOAD_TOTAL_DURATIONS]: (state, { totalDurations }) => ({
    ...state,
    homeTotalDuration: totalDurations,
    textSlider: R.set(durationLens, totalDurations.today, state.textSlider),
  }),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
