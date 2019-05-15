// modules
import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { push } from 'react-router-redux'
//actions
import {
  SUBMIT_EDIT,
  CLOSE_EDIT,
  dispatchChangeTitleIsError,
} from './Edit.action'
import { dispatchSetEditedLog } from '../../Main/App.action'
import { dispatchRefetchTotalDuration } from '../../components/Home/Main/Home.action'
import { dispatchChangeSnackbarStage } from '../Snackbar/Snackbar.action'
//helper
import { postRequest } from '../../../helper/functions/request.helper'
import {
  formatTime,
  checkEditTimesOrder,
} from '../../../helper/functions/time.helper'
// const
const { W } = window

// epics
const submitEditEpic = (action$, { dispatch }) =>
  action$
    .ofType(SUBMIT_EDIT)
    .pluck('payload')
    .filter(
      ({ title }) =>
        title.length ||
        (() => {
          dispatchChangeTitleIsError(true)
          dispatchChangeSnackbarStage('Title is empty')
          return false
        })(),
    )
    .filter(
      ({ times }) =>
        checkEditTimesOrder(times) ||
        (() => {
          dispatchChangeSnackbarStage('Your intervals have overlap')
          return false
        })(),
    )
    .map(({ log, times, title }) => ({
      ...log,
      times: R.map(
        ({ _id, start, end }) => ({
          _id,
          start: formatTime(start),
          end: end === 'Running' ? 'running' : formatTime(end),
        }),
        times,
      ),
      title,
    }))
    .do(log => {
      postRequest('/updateLog')
        .send(log)
        .on('error', err => {
          if (err.status !== 304) {
            dispatchChangeSnackbarStage('Server disconnected!')
          }
        })
        .then(() => dispatchSetEditedLog(log))
        .then(() => {
          dispatchChangeSnackbarStage('Updated Succesfully!')
          dispatch(push('/Report'))
          dispatchChangeTitleIsError(false)
          dispatchRefetchTotalDuration()
          W && W.analytics('EDIT_LOG')
        })
    })
    .ignoreElements()

const closeEditEpic = action$ =>
  action$.ofType(CLOSE_EDIT).map(() => push('/Report'))

export default combineEpics(submitEditEpic, closeEditEpic)
