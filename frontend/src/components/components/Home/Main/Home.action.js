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

export const SET_SECONDS_ELAPSED = 'SET_SECONDS_ELAPSED'
export const setSecondsElapsed = createAction(SET_SECONDS_ELAPSED, value => ({ value }))
export const dispatchSetSecondsElapsed = (...args) => dispatch(setSecondsElapsed(...args))

export const INCREMENT_SECONDS_ELAPSED = 'INCREMENT_SECONDS_ELAPSED'
export const incrementSecondsElapsed = createAction(INCREMENT_SECONDS_ELAPSED)
export const dispatchIncrementSecondsElapsed = (...args) =>
  dispatch(incrementSecondsElapsed(...args))

export const CHANGE_RUNNING_ID = 'CHANGE_RUNNING_ID'
export const changeRunningId = createAction(CHANGE_RUNNING_ID, _id => ({ _id }))
export const dispatchChangeRunningId = (...args) => dispatch(changeRunningId(...args))

export const CHECK_TO_SET_SECONDS_ELAPSED = 'CHECK_TO_SET_SECONDS_ELAPSED'
export const checkToSetSecondsElapsed = createAction(CHECK_TO_SET_SECONDS_ELAPSED)
export const dispatchCheckToSetSecondsElapsed = (...args) =>
  dispatch(checkToSetSecondsElapsed(...args))

export const CHECK_TO_SET_BLUR = 'CHECK_TO_SET_BLUR'
export const checkToSetBlur = createAction(CHECK_TO_SET_BLUR)
export const dispatchCheckToSetBlur = (...args) => dispatch(checkToSetBlur(...args))
