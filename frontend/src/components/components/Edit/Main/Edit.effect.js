// modules
import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { push } from '../../../../setup/redux'
//actions
import {
  SUBMIT_EDIT,
  CLOSE_EDIT,
  dispatchChangeTitleIsError,
  dispatchChangeIsOpenDialog,
} from './Edit.action'
import {
  dispatchSetEditedLog,
  dispatchSetIsLoading,
} from '../../../Main/App.action'
import { dispatchRefetchTotalDuration } from '../../Home/Main/Home.action'
import { dispatchChangeSnackbarStage } from '../../Snackbar/Snackbar.action'
//helper
import { postRequest } from '../../../../helper/functions/request.helper'
import {
  formatTime,
  checkEditTimesOrder,
} from '../../../../helper/functions/time.helper'
import { checkBeforeEditLog } from './Edit.helpers'
// const
const { W } = window

// epics
const submitEditEpic = action$ =>
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
          dispatchChangeSnackbarStage(
            'Your Edited intervals have overlap together',
          )
          return false
        })(),
    )

    .map(payload => ({
      ...payload,
      ...checkBeforeEditLog(payload),
    }))
    .do(
      ({ message, permission }) =>
        !permission && dispatchChangeSnackbarStage(message),
    )
    // TODO ISERROR MUST BE IMPLEMENTED
    // .do(({ isError }) => dispatchChangeIsErrorInAdd(isError))
    .filter(({ permission }) => permission)
    .do(() => dispatchSetIsLoading(true))
    .map(({ log, times, title }) => ({
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
          dispatchSetIsLoading(false)
          dispatchChangeIsOpenDialog(false)
          dispatchChangeSnackbarStage('Updated Succesfully!')
          push('/Report')
          dispatchChangeTitleIsError(false)
          dispatchRefetchTotalDuration()
          W && W.analytics('EDIT_LOG')
        })
    })
    .ignoreElements()

const closeEditEpic = action$ =>
  action$
    .ofType(CLOSE_EDIT)
    .do(() => dispatchChangeIsOpenDialog(false))
    .delay(200)
    .map(() => push('/Report'))
    .ignoreElements()

export default combineEpics(submitEditEpic, closeEditEpic)
