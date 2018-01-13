// modules
import * as R from 'ramda'
// actions
import {
  CHANGE_TEXT_SLIDER,
  LOAD_TODAY_TOTAL_DURATION,
  LOAD_THISWEEK_TOTAL_DURATION,
  LOAD_THISMONTH_TOTAL_DURATION,
} from './Home.action'
// helpers
import { NextTextSliderName, NextTextSliderDuration } from './Home.helper'

// state
const initialState = {
  textSlider: { name: 'Today', duration: '' },
  homeTotalDuration: { today: '', thisWeek: '', thisMonth: '' },
}


// lens & views
const durationLens = R.lensProp('duration')
const todayLens = R.lensProp('today')
const thisWeekLens = R.lensProp('thisWeek')
const thisMonthLens = R.lensProp('thisMonth')

// reducers
const reducers = {
  [CHANGE_TEXT_SLIDER]: (state, { value }) => ({ ...state,
    textSlider: {
      name: NextTextSliderName(state.textSlider.name, value),
      duration: R.view(R.lensProp(NextTextSliderDuration(state.textSlider.name, value)),
        state.homeTotalDuration),
    },
  }),

  [LOAD_TODAY_TOTAL_DURATION]: (state, { value }) => ({ ...state,
    homeTotalDuration: R.set(todayLens, value, state.homeTotalDuration),
    textSlider: R.set(durationLens, value, state.textSlider),
  }),

  [LOAD_THISWEEK_TOTAL_DURATION]: (state, { value }) => ({ ...state,
    homeTotalDuration: R.set(thisWeekLens, value, state.homeTotalDuration),
  }),

  [LOAD_THISMONTH_TOTAL_DURATION]: (state, { value }) => ({ ...state,
    homeTotalDuration: R.set(thisMonthLens, value, state.homeTotalDuration),
  }),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
