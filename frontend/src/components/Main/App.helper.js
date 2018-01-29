// modules
import * as R from 'ramda'
import { createMuiTheme } from 'material-ui/styles'
import setMinutes from 'date-fns/set_minutes'
import setHours from 'date-fns/set_hours'
// components
import host from '../../setup/config'
// const
const request = require('superagent')

export const formatTime = time =>
  setHours(setMinutes(new Date(), R.slice(3, 5, time)), R.slice(0, 2, time))

export const getRequest = path => request
  .get(host + path)
  .set('Access-Control-Allow-Origin', '*')

export const postRequest = path => request
  .post(host + path)
  .set('Access-Control-Allow-Origin', '*')

export const theme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        height: '50px',
      },
    },
    MuiTabIndicator: {
      root: {
        height: '5px',
      },
    },
    MuiCircularProgress: {
      primaryColor: {
        color: 'white',
      },
    },
  },
})
