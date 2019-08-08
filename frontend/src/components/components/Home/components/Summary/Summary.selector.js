// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
import { differenceInSeconds } from 'date-fns'
// helpers
import { getNow } from '../../../../../helper/functions/time.helper'

const getLogs = state => state.App.logs 
const getTextSliderDuration = state => state.Home.textSlider.duration
const getRunningId = state => state.Home.runningId
const getSecondsElapsed = state => state.Home.secondsElapsed

const getTotalDuration = createSelector( 
  [getLogs, getRunningId, getTextSliderDuration, getSecondsElapsed],
  (logs, runningId, duration) => {
    if (runningId) {
      return R.compose(
          difference => difference + duration,
          time => time && differenceInSeconds(getNow(), time.start),
          times => times && R.find(R.propEq('end', 'running'), times),
          log => log && R.prop('times', log),
          R.find(R.propEq('_id', runningId)),
        )(logs)
    }
    return duration
  },
)

export {
  getTotalDuration,
}
