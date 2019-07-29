// modules
import * as R from 'ramda'
import { combineEpics, ofType } from 'redux-observable'
import 'rxjs'
import { push } from '../../../../setup/redux'
//actions
import {
  SUBMIT_EDIT,
  CLOSE_EDIT,
  dispatchChangeTitleIsError,
  dispatchChangeIsOpenDialog,
} from './Edit.action'
import { dispatchSetEditedLog } from '../../../Main/App.action'
import { dispatchRefetchTotalDuration } from '../../Home/Main/Home.action'
import { dispatchChangeSnackbarStage } from '../../Snackbar/Snackbar.action'
//helper
import { postRequest } from '../../../../helper/functions/request.helper'
import {
  formatTime,
  checkEditTimesOrder,
} from '../../../../helper/functions/time.helper'
import { pluck, filter, map, tap, ignoreElements, delay } from 'rxjs/operators'
// const
const { W } = window

// epics
const submitEditEpic = action$ =>
  action$.pipe(
    ofType(SUBMIT_EDIT),
    pluck('payload'),
    filter(
      ({ title }) =>
        title.length ||
        (() => {
          dispatchChangeTitleIsError(true)
          dispatchChangeSnackbarStage('Title is empty')
          return false
        })(),
    ),
    filter(
      ({ times }) =>
        checkEditTimesOrder(times) ||
        (() => {
          dispatchChangeSnackbarStage('Your intervals have overlap')
          return false
        })(),
    ),
    map(({ log, times, title }) => ({
      ...log,
      times: R.map(
        ({ _id, start, end }) => ({
          _id,
          start: formatTime(start),
          end: end === 'running' ? end : formatTime(end),
        }),
        times,
      ),
      title,
    })),
    tap(log => {
      postRequest('/updateLog')
        .send(log)
        .on('error', err => {
          if (err.status !== 304) {
            dispatchChangeSnackbarStage('Server disconnected!')
          }
        })
        .then(() => dispatchSetEditedLog(log))
        .then(() => {
          dispatchChangeIsOpenDialog(false)
          dispatchChangeSnackbarStage('Updated Succesfully!')
          push('/Report')
          dispatchChangeTitleIsError(false)
          dispatchRefetchTotalDuration()
          W && W.analytics('EDIT_LOG')
        })
    }),
    ignoreElements(),
  )

const closeEditEpic = action$ =>
  action$.pipe(
    ofType(CLOSE_EDIT),
    tap(() => dispatchChangeIsOpenDialog(false)),
    delay(200),
    map(() => push('/Report')),
    ignoreElements(),
  )

export default combineEpics(submitEditEpic, closeEditEpic)
