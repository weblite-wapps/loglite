import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { SUBMIT_EDIT, CLOSE_EDIT } from './Edit.action'
import { dispatchSetEditedLog } from '../../Main/App.action'
//helper
import { postRequest } from '../../../helper/functions/request.helper'
import {
  formatTime,
  checkEditTimesOrder,
} from '../../../helper/functions/time.helper'
import { push } from 'react-router-redux'
const submitEditEpic = (action$, { dispatch }) =>
  action$
    .ofType(SUBMIT_EDIT)
    .pluck('payload')
    .filter(({ times }) => checkEditTimesOrder(times))
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
      postRequest('/updateLog')
        .send(log)
        .on('error', err => {
          if (err.status !== 304) {
            console.log(err)
            // snackbarMessage({ message: 'Server disconnected!' })
          }
        })
        .then(() => dispatchSetEditedLog(log))
    })
    .do(() => dispatch(push('/Report')))
    .ignoreElements()

const closeEditEpic = (action$, { dispatch }) =>
  action$
    .ofType(CLOSE_EDIT)
    .do(() => dispatch(push('/Report')))
    .ignoreElements()

export default combineEpics(submitEditEpic, closeEditEpic)
