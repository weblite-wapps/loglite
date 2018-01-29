// modules
import { createMuiTheme } from 'material-ui/styles'
// components
import host from '../../../../setup/config'
// const
const request = require('superagent')

export const postRequest = path => request
  .post(host + path)
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

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      fab: {
        backgroundColor: '#505050',
        height: '60px',
        width: '60px',
      },
    },
    MuiSvgIcon: {
      root: {
        color: 'white',
        height: '50px',
        width: '50px',
      },
    },
    MuiDivider: {
      default: {
        backgroundColor: '#000000',
      },
    },
  },
})
