// modules
import { createAction } from 'redux-actions'


// actions
const CHANGE_TEXT_SLIDER = 'CHANGE_TEXT_SLIDER'
const changeTextSlider = createAction(CHANGE_TEXT_SLIDER, value => ({ value }))

const LOAD_TODAY_TOTAL_DURATION = 'LOAD_TODAY_TOTAL_DURATION'
const loadTodayTotalDuration = createAction(LOAD_TODAY_TOTAL_DURATION, value => ({ value }))

const LOAD_THISWEEK_TOTAL_DURATION = 'LOAD_THISWEEK_TOTAL_DURATION'
const loadThisWeekTotalDuration = createAction(LOAD_THISWEEK_TOTAL_DURATION, value => ({ value }))

const LOAD_THISMONTH_TOTAL_DURATION = 'LOAD_THISMONTH_TOTAL_DURATION'
const loadThisMonthTotalDuration = createAction(LOAD_THISMONTH_TOTAL_DURATION, value => ({ value }))

const REFETCH_TOTAL_DURATION = 'REFETCH_TOTAL_DURATION'
const refetchTotalDuration = createAction(REFETCH_TOTAL_DURATION)

const COUNTINUE_COUNTING = 'COUNTINUE_COUNTING'
const countinueCounting = createAction(COUNTINUE_COUNTING, _id => ({ _id }))

export {
  CHANGE_TEXT_SLIDER, changeTextSlider,
  LOAD_TODAY_TOTAL_DURATION, loadTodayTotalDuration,
  LOAD_THISWEEK_TOTAL_DURATION, loadThisWeekTotalDuration,
  LOAD_THISMONTH_TOTAL_DURATION, loadThisMonthTotalDuration,
  REFETCH_TOTAL_DURATION, refetchTotalDuration,
  COUNTINUE_COUNTING, countinueCounting,
}
