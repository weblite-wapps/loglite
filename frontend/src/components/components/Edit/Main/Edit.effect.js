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
  loadTagsDataInEdit,
  SET_TAG_QUERY_IN_EDIT,
  dispatchFetchTagsInEdit,
} from './Edit.action'
import {
  dispatchSetEditedLog,
  dispatchSetIsLoading,
} from '../../../Main/App.action'
import { dispatchRefetchTotalDuration } from '../../Home/Main/Home.action'
import { LOAD_TAGS_DATA_IN_ADD } from '../../Add/Main/Add.action'
import { dispatchChangeSnackbarStage } from '../../Snackbar/Snackbar.action'
//helper
import {
  postRequest,
  getRequest,
} from '../../../../helper/functions/request.helper'
import {
  formatTime,
  checkEditTimesOrder,
} from '../../../../helper/functions/time.helper'
import { wisView, userIdView } from '../../../Main/App.reducer'
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
          dispatchChangeSnackbarStage('Your intervals have overlap')
          return false
        })(),
    )
    .map(({ log, times, title, tags }) => ({
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
      tags,
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

const loadTagsDataEpic = action$ =>
  action$
    .ofType(LOAD_TAGS_DATA_IN_ADD)
    .map(action => loadTagsDataInEdit(action.payload.tags))

const effectSearchTagsEpic = action$ =>
  action$
    .ofType(SET_TAG_QUERY_IN_EDIT)
    .pluck('payload')
    .do(console.log)
    .filter(payload => payload.trim() !== '')
    .debounceTime(250)
    .do(() => dispatchSetIsLoading(true))
    .switchMap(payload =>
      getRequest('/searchTags')
        .query({
          wis: wisView(),
          userId: userIdView(),
          label: payload,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(() => dispatchSetIsLoading(false))
    .do(({ body }) => dispatchFetchTagsInEdit(body))
    .ignoreElements()

export default combineEpics(
  submitEditEpic,
  closeEditEpic,
  loadTagsDataEpic,
  effectSearchTagsEpic,
)
