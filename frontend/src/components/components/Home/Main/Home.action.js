// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../../setup/redux'


// actions
export const CHANGE_TEXT_SLIDER = 'CHANGE_TEXT_SLIDER'
export const changeTextSlider = createAction(CHANGE_TEXT_SLIDER, value => ({ value }))
export const dispatchChangeTextSlider = (...args) => dispatch(changeTextSlider(...args))

export const LOAD_TODAY_TOTAL_DURATION = 'LOAD_TODAY_TOTAL_DURATION'
export const loadTodayTotalDuration = createAction(LOAD_TODAY_TOTAL_DURATION, value => ({ value }))
export const dispatchLoadTodayTotalDuration = (...args) => dispatch(loadTodayTotalDuration(...args))

export const LOAD_THISWEEK_TOTAL_DURATION = 'LOAD_THISWEEK_TOTAL_DURATION'
export const loadThisWeekTotalDuration = createAction(
  LOAD_THISWEEK_TOTAL_DURATION,
  value => ({ value }),
)
export const dispatchLoadThisWeekTotalDuration = (...args) =>
  dispatch(loadThisWeekTotalDuration(...args))

export const LOAD_THISMONTH_TOTAL_DURATION = 'LOAD_THISMONTH_TOTAL_DURATION'
export const loadThisMonthTotalDuration = createAction(
  LOAD_THISMONTH_TOTAL_DURATION,
  value => ({ value }),
)
export const dispatchLoadThisMonthTotalDuration = (...args) =>
  dispatch(loadThisMonthTotalDuration(...args))

export const REFETCH_TOTAL_DURATION = 'REFETCH_TOTAL_DURATION'
export const refetchTotalDuration = createAction(REFETCH_TOTAL_DURATION)
export const dispatchRefetchTotalDuration = (...args) => dispatch(refetchTotalDuration(...args))

export const COUNTINUE_COUNTING = 'COUNTINUE_COUNTING'
export const countinueCounting = createAction(COUNTINUE_COUNTING, _id => ({ _id }))
export const dispatchCountinueCounting = (...args) => dispatch(countinueCounting(...args))
