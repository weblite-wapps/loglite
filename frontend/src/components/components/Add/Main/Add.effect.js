// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
// local modules
// import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { getRequest, postRequest } from '../../../../helper/functions/request.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
import { formatTime } from '../../../../helper/functions/time.helper'
import { checkBeforeAddTag } from '../../../Main/App.helper'
import { checkBeforeAddLog, checkBeforeAddCustomLog } from './Add.helper'
// actions
import { dispatchAddLog, dispatchChangeTab, dispatchSetIsLoading } from '../../../Main/App.action'
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


const effectSearchTagsEpic = action$ =>
  action$.ofType(SET_QUERY_IN_ADD)
    .pluck('payload')
    .filter(payload => payload.queryTag.trim() !== '')
    .debounceTime(250)
    .do(() => dispatchSetIsLoading(true))
    .switchMap(payload => getRequest('/serachTags')
      .query({ wis: wisView(), userId: userIdView(), label: payload.queryTag }))
      // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .do(({ body }) => dispatchFetchTagsInAdd(body))
    .ignoreElements()


const effectHandleAddTag = action$ =>
  action$.ofType(HANDLE_ADD_TAG_IN_ADD)
    .map(() => ({ ...checkBeforeAddTag(queryTagView(), tagsView()) }))
    .do(({ permission }) => permission && dispatchAddTagInAdd())
    // .do(({ permission, message }) => !permission && snackbarMessage({ message }))
    .ignoreElements()


const effectHandleAddLog = action$ =>
  action$.ofType(HANDLE_ADD_LOG)
    .pluck('payload')
    .map(payload => ({ ...payload, ...checkBeforeAddLog(payload) }))
    // .do(({ permission, message }) => !permission && snackbarMessage({ message }))
    .do(({ isError }) => dispatchChangeIsErrorInAdd(isError))
    .filter(({ permission }) => permission)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ title, tags }) => Promise.all([
      postRequest('/saveLog')
        .send({
          title,
          tags,
          times: [],
          date: formattedDate(new Date()),
          isPinned: false,
          created_at: new Date(),
          userId: userIdView(),
          wis: wisView(),
        }),
        // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
      postRequest('/saveTags')
        .send({
          tags,
          userId: userIdView(),
          wis: wisView(),
        })
        // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
    ]))
    .do(success => dispatchAddLog(success[0].body))
    .do(success => dispatchLoadTagsDataInAdd(success[1].body))
    .do(() => dispatchSetIsLoading(false))
    .do(() => dispatchChangeTab('Home'))
    // .do(() => snackbarMessage({ message: 'Added successfully!' }))
    .do(() => dispatchResetInputs())
    .ignoreElements()


const effectHandleAddCustomLog = action$ =>
  action$.ofType(HANDLE_ADD_CUSTOM_LOG)
    .pluck('payload')
    .map(payload => ({ ...payload, ...checkBeforeAddCustomLog() }))
    // .do(({ message, permission }) => !permission && snackbarMessage({ message }))
    .do(({ isError }) => dispatchChangeIsErrorInAdd(isError))
    .filter(({ permission }) => permission)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ title, tags, start, end, date }) => Promise.all([
      postRequest('/saveCustomLog')
        .send({
          title,
          tags,
          times: [{ start: formatTime(start), end: formatTime(end) }],
          date,
          isPinned: false,
          created_at: new Date(),
          userId: userIdView(),
          wis: wisView(),
        }),
        // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
      postRequest('/saveTags')
        .send({
          tags,
          userId: userIdView(),
          wis: wisView(),
        })
        // .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
    ]))
    .do(success => dispatchAddLog(success[0].body))
    .do(success => dispatchLoadTagsDataInAdd(success[1].body))
    .do(() => dispatchSetIsLoading(false))
    // .do(() => snackbarMessage({ message: 'Added successfully!' }))
    .do(() => dispatchChangeTab('Home'))
    .do(() => dispatchResetInputs())
    .ignoreElements()


export default combineEpics(
  effectSearchTagsEpic,
  effectHandleAddTag,
  effectHandleAddLog,
  effectHandleAddCustomLog,
)
