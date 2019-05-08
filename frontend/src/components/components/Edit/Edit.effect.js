import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
import {
  SUBMIT_EDIT,
  CLOSE_EDIT,
  dispatchChangeTitleIserror,
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
import { push } from 'react-router-redux'
const submitEditEpic = (action$, { dispatch }) =>
  action$
    .ofType(SUBMIT_EDIT)
    .pluck('payload')
    .filter(
      ({ title }) =>
        title.length ||
        (() => {
          dispatchChangeTitleIserror(true)
          dispatchChangeSnackbarStage({
            open: true,
            message: 'Title is empty',
          })
          return false
        })(),
    )
    .filter(
      ({ times }) =>
        checkEditTimesOrder(times) ||
        (() => {
          dispatchChangeSnackbarStage({
            open: true,
            message: 'Your intervals have overlap',
          })
          return false
        })(),
    )
    .map(({ log, times, title }) => ({
      ...log,
      times: R.map(
        ({ _id, start, end }) => ({
          _id,
          start: formatTime(start),
          end: formatTime(end),
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
            dispatchChangeSnackbarStage({
              open: true,
              message: 'Server disconnected!',
            })
          }
        })
        .then(() => dispatchSetEditedLog(log))
    })
    .do(() => dispatchRefetchTotalDuration())
    .do(() => dispatch(push('/Report')))
    .do(() => dispatchChangeTitleIserror(false))
    .do(() =>
      dispatchChangeSnackbarStage({
        open: true,
        message: 'Updated Succesfully!',
      }),
    )
    .ignoreElements()

const closeEditEpic = (action$, { dispatch }) =>
  action$
    .ofType(CLOSE_EDIT)
    .do(() => dispatch(push('/Report')))
    .ignoreElements()

export default combineEpics(submitEditEpic, closeEditEpic)
