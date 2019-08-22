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
  HANDLE_ADD_TAG_IN_EDIT,
  dispatchAddTagInEdit,
  SUBMIT_EDIT_REALTIME,
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
import { checkBeforeEditLog } from './Edit.helpers'
import { wisView, userIdView } from '../../../Main/App.reducer'
import { queryTagView, tagsView } from './Edit.reducer'
import { checkBeforeAddTag } from '../../../Main/App.helper'
import { pulse } from '../../../../helper/functions/realTime.helper'
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
    .mergeMap(log =>
      Promise.all([
        postRequest('/updateLog')
          .send(log)
          .on('error', err => {
            if (err.status !== 304) {
              dispatchChangeSnackbarStage('Server disconnected!')
            }
          })
          .then(() => log),
        // .then(() => dispatchSetEditedLog(log)),
        postRequest('/saveTags')
          .send({
            tags: log.tags,
            userId: userIdView(),
            wis: wisView(),
          })
          .on(
            'error',
            err =>
              err.status !== 304 &&
              dispatchChangeSnackbarStage('Server disconnected!'),
          ),
      ]),
    )
    .do(success => pulse(SUBMIT_EDIT_REALTIME, success[0]))
    .do(() => {
      dispatchChangeIsOpenDialog(false)
      dispatchChangeSnackbarStage('Updated Succesfully!')
      push('/Report')
      dispatchChangeTitleIsError(false)
      W && W.analytics('EDIT_LOG')
    })
    .do()
    .ignoreElements()

const submitEditRealTimeEpic = action$ =>
  action$
    .ofType(SUBMIT_EDIT_REALTIME)
    .pluck('payload')
    .do(dispatchSetEditedLog)
    .do(() => dispatchRefetchTotalDuration())
    .ignoreElements()

// TODO: INCREASE & DECREASE IN NUMBER OF TAGS MUST BE IMPLEMENTED

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

const effectHandleAddTag = action$ =>
  action$
    .ofType(HANDLE_ADD_TAG_IN_EDIT)
    .map(() => ({ ...checkBeforeAddTag(queryTagView(), tagsView()) }))
    .do(({ permission }) => permission && dispatchAddTagInEdit())
    .do(
      ({ permission, message }) =>
        !permission && dispatchChangeSnackbarStage(message),
    )
    .ignoreElements()

export default combineEpics(
  submitEditEpic,
  closeEditEpic,
  loadTagsDataEpic,
  effectSearchTagsEpic,
  effectHandleAddTag,
  submitEditRealTimeEpic,
)
