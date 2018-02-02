// components
import host from '../../../../setup/config'
// const
const request = require('superagent')

export const getRequest = path => request
  .get(host + path)
  .set('Access-Control-Allow-Origin', '*')

export const NextTextSliderName = (currentStage, direction) => {
  switch (currentStage) {
    case 'Today': return 'This Week'
    case 'This Week': return (direction === 'Next') ? 'This Month' : 'Today'
    case 'This Month': return 'This Week'
    default: return null
  }
}

export const NextTextSliderDuration = (currentStage, direction) => {
  switch (currentStage) {
    case 'Today': return 'thisWeek'
    case 'This Week': return (direction === 'Next') ? 'thisMonth' : 'today'
    case 'This Month': return 'thisWeek'
    default: return null
  }
}
