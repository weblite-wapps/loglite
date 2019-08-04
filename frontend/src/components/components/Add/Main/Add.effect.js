// modules
import { combineEpics, ofType } from 'redux-observable'
import {
  pluck,
  map,
  tap,
  filter,
  mergeMap,
  ignoreElements,
  debounceTime,
  switchMap,
} from 'rxjs/operators'
// local modules
import { dispatchChangeSnackbarStage } from '../../Snackbar/Snackbar.action'
// helpers
import {
  getRequest,
  postRequest,
} from '../../../../helper/functions/request.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
import { formatTime, getNow } from '../../../../helper/functions/time.helper'
import { checkBeforeAddTag } from '../../../Main/App.helper'
import { checkBeforeAddLog, checkBeforeAddCustomLog } from './Add.helper'
// actions
import {
  dispatchAddLog,
  dispatchChangeTab,
  dispatchSetIsLoading,
} from '../../../Main/App.action'
import {
  SET_QUERY_IN_ADD,
  HANDLE_ADD_TAG_IN_ADD,
  HANDLE_ADD_LOG,
  HANDLE_ADD_CUSTOM_LOG,
  dispatchFetchTagsInAdd,
  dispatchLoadTagsDataInAdd,
  dispatchAddTagInAdd,
  dispatchChangeIsErrorInAdd,
  dispatchResetInputs,
} from './Add.action'
// views
import { wisView, userIdView } from '../../../Main/App.reducer'
import { queryTagView, tagsView } from './Add.reducer'
// const
const { W } = window

const effectSearchTagsEpic = action$ =>
  action$.pipe(
    ofType(SET_QUERY_IN_ADD),
    pluck('payload'),
    filter(payload => payload.queryTag.trim() !== ''),
    debounceTime(250),
    tap(() => dispatchSetIsLoading(true)),
    switchMap(payload =>
      getRequest('/searchTags')
        .query({
          wis: wisView(),
          userId: userIdView(),
          label: payload.queryTag,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    ),
    tap(() => dispatchSetIsLoading(false)),
    tap(({ body }) => dispatchFetchTagsInAdd(body)),
    ignoreElements(),
  )

const effectHandleAddTag = action$ =>
  action$.pipe(
    ofType(HANDLE_ADD_TAG_IN_ADD),
    map(() => ({ ...checkBeforeAddTag(queryTagView(), tagsView()) })),
    tap(({ permission }) => permission && dispatchAddTagInAdd()),
    tap(
      ({ permission, message }) =>
        !permission && dispatchChangeSnackbarStage(message),
    ),
    ignoreElements(),
  )

const effectHandleAddLog = action$ =>
  action$.pipe(
    ofType(HANDLE_ADD_LOG),
    pluck('payload'),
    map(payload => ({ ...payload, ...checkBeforeAddLog(payload) })),
    tap(
      ({ permission, message }) =>
        !permission && dispatchChangeSnackbarStage(message),
    ),
    tap(({ isError }) => dispatchChangeIsErrorInAdd(isError)),
    filter(({ permission }) => permission),
    tap(
      ({ tags }) => !!tags.length && window.W && window.W.analytics('ADD_TAG'),
    ),
    tap(() => dispatchSetIsLoading(true)),
    mergeMap(({ title, tags }) =>
      Promise.all([
        postRequest('/saveLog')
          .send({
            title,
            tags,
            date: formattedDate(getNow()),
            times: [],
            isPinned: false,
            userId: userIdView(),
            wis: wisView(),
          })
          .on(
            'error',
            err =>
              err.status !== 304 &&
              dispatchChangeSnackbarStage('Server disconnected!'),
          ),
        postRequest('/saveTags')
          .send({
            tags,
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
    ),
    tap(success => dispatchAddLog(success[0].body)),
    tap(success => dispatchLoadTagsDataInAdd(success[1].body)),
    tap(() => dispatchSetIsLoading(false)),
    tap(() => dispatchChangeTab('Home')),
    tap(() => dispatchChangeSnackbarStage('Added successfully!')),
    tap(() => dispatchResetInputs()),
    tap(() => W && W.analytics('ADD_LOG', { custom: false })),
    ignoreElements(),
  )

const effectHandleAddCustomLog = action$ =>
  action$.pipe(
    ofType(HANDLE_ADD_CUSTOM_LOG),
    pluck('payload'),
    map(payload => ({ ...payload, ...checkBeforeAddCustomLog(payload) })),
    tap(
      ({ message, permission }) =>
        !permission && dispatchChangeSnackbarStage(message),
    ),
    tap(({ isError }) => dispatchChangeIsErrorInAdd(isError)),
    filter(({ permission }) => permission),
    tap(() => dispatchSetIsLoading(true)),
    mergeMap(({ title, tags, start, end, date }) =>
      Promise.all([
        postRequest('/saveCustomLog')
          .send({
            title,
            tags,
            times: [{ start: formatTime(start), end: formatTime(end) }],
            date,
            isPinned: false,
            userId: userIdView(),
            wis: wisView(),
          })
          .on(
            'error',
            err =>
              err.status !== 304 &&
              dispatchChangeSnackbarStage('Server disconnected!'),
          ),
        postRequest('/saveTags')
          .send({
            tags,
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
    ),
    tap(success => dispatchAddLog(success[0].body)),
    tap(success => dispatchLoadTagsDataInAdd(success[1].body)),
    tap(() => dispatchSetIsLoading(false)),
    tap(() => dispatchChangeSnackbarStage('Added successfully!')),
    tap(() => dispatchChangeTab('Home')),
    tap(() => dispatchResetInputs()),
    tap(() => W && W.analytics('ADD_LOG', { custom: true })),
    ignoreElements(),
  )

export default combineEpics(
  effectSearchTagsEpic,
  effectHandleAddTag,
  effectHandleAddLog,
  effectHandleAddCustomLog,
)
