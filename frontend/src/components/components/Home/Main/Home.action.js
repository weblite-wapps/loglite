// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../../setup/redux'


// actions
export const CHANGE_TEXT_SLIDER = 'CHANGE_TEXT_SLIDER'
export const changeTextSlider = createAction(CHANGE_TEXT_SLIDER, value => ({ value }))
export const dispatchChangeTextSlider = (...args) => dispatch(changeTextSlider(...args))

export const LOAD_TOTAL_DURATIONS = 'LOAD_TOTAL_DURATIONS'
export const loadTotalDurations = createAction(LOAD_TOTAL_DURATIONS,
  totalDurations => ({ totalDurations }))
export const dispatchLoadTotalDurations = (...args) => dispatch(loadTotalDurations(...args))

export const REFETCH_TOTAL_DURATION = 'REFETCH_TOTAL_DURATION'
export const refetchTotalDuration = createAction(REFETCH_TOTAL_DURATION)
export const dispatchRefetchTotalDuration = (...args) => dispatch(refetchTotalDuration(...args))

export const COUNTINUE_COUNTING = 'COUNTINUE_COUNTING'
export const countinueCounting = createAction(COUNTINUE_COUNTING, _id => ({ _id }))
export const dispatchCountinueCounting = (...args) => dispatch(countinueCounting(...args))
