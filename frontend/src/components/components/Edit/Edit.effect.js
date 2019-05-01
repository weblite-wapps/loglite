import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { UPDATE_LOG } from './Edit.action'
import {
  getRequest,
  postRequest,
} from '../../../helper/functions/request.helper'
import { formatTime } from '../../../helper/functions/time.helper'
import { push } from 'react-router-redux'
const submitEditEpic = (action$, { dispatch }) =>
  action$
    .ofType(UPDATE_LOG)
    .pluck('payload')
    .map(({ log, times }) => ({
      ...log,
      times: R.map(
        ({ _id, start, end }) => ({
          _id,
          start: formatTime(start),
          end: formatTime(end),
        }),
        times,
      ),
    }))
    .do(log => {
      console.log(log)
      postRequest('/updateLog')
        .send(log)
        .on('error', err => {
          if (err.status !== 304) {
            console.log(err)
            // snackbarMessage({ message: 'Server disconnected!' })
          }
        })
        .then(res => console.log(res))
    })
    // .do(() => dispatch(push('/Report')))
    .ignoreElements()

export default combineEpics(submitEditEpic)
