// modules
import * as R from 'ramda'
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
