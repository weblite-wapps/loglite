// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { getRequest, postRequest } from '../../../../helper/functions/request.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
import { formatTime } from '../../../../helper/functions/time.helper'
import { checkBeforeAddTag } from '../../../Main/App.helper'
import { checkBeforeAddLog, checkBeforeAddCustomLog } from './Add.helper'
// actions
import {
  ADD_LOG,
  ADD_CUSTOM_LOG,
  restoreLog,
  dispatchAddLog,
  dispatchAddCustomLog,
  dispatchChangeTab,
} from '../../../Main/App.action'
import {
  SET_QUERY_IN_ADD,
  HANDLE_ADD_TAG_IN_ADD,
  HANDLE_ADD_LOG,
  HANDLE_ADD_CUSTOM_LOG,
  fetchTagsInAdd,
  loadTagsDataInAdd,
  resetInputs,
  dispatchAddTagInAdd,
  dispatchChangeIsErrorInAdd,
} from './Add.action'
// views
import { wisView, userIdView } from '../../../Main/App.reducer'
import { queryTagView, tagsView } from './Add.reducer'


const effectSearchTagsEpic = action$ =>
  action$.ofType(SET_QUERY_IN_ADD)
    .pluck('payload')
    .filter(payload => payload.queryTag.trim() !== '')
    .debounceTime(250)
    .mergeMap(payload =>
      getRequest('/serachTags')
        .query({ wis: wisView(), userId: userIdView(), label: payload.queryTag })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .map(({ body }) => fetchTagsInAdd(body))


const addLogEpic = action$ =>
  action$.ofType(ADD_LOG)
    .pluck('payload')
    .mergeMap(({ title, tags }) => Promise.all([
      postRequest('/saveLog')
        .send({
          title,
          tags,
          times: [],
          date: formattedDate(new Date()),
          userId: userIdView(),
          wis: wisView(),
        })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
      postRequest('/saveTags')
        .send({
          tags,
          userId: userIdView(),
          wis: wisView(),
        })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
    ]))
    .mergeMap(success =>
      [restoreLog(success[0].body), loadTagsDataInAdd(success[1].body)])


const addCustomLogEpic = action$ =>
  action$.ofType(ADD_CUSTOM_LOG)
    .pluck('payload')
    .mergeMap(({ title, tags, start, end, date }) => Promise.all([
      postRequest('/saveCustomLog')
        .send({
          title,
          tags,
          times: [{ start: formatTime(start), end: formatTime(end) }],
          date,
          userId: userIdView(),
          wis: wisView(),
        })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
      postRequest('/saveTags')
        .send({
          tags,
          userId: userIdView(),
          wis: wisView(),
        })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
    ]))
    .mergeMap(success => [
      success[0].text === 'added successfully!' ? resetInputs() : restoreLog(success[0].body),
      loadTagsDataInAdd(success[1].body)])


const effectHandleAddTag = action$ =>
  action$.ofType(HANDLE_ADD_TAG_IN_ADD)
    .map(() => ({ ...checkBeforeAddTag(queryTagView(), tagsView()) }))
    .do(({ permission }) => permission && dispatchAddTagInAdd())
    .do(({ permission, message }) => !permission && snackbarMessage({ message }))
    .ignoreElements()


const effectHandleAddLog = action$ =>
  action$.ofType(HANDLE_ADD_LOG)
    .pluck('payload')
    .map(payload => ({ ...payload, ...checkBeforeAddLog() }))
    .do(({ message }) => snackbarMessage({ message }))
    .do(({ isError }) => dispatchChangeIsErrorInAdd(isError))
    .filter(({ permission }) => permission)
    .do(({ title, tags }) => dispatchAddLog(title, tags))
    .do(() => dispatchChangeTab('Home'))
    .ignoreElements()


const effectHandleAddCustomLog = action$ =>
  action$.ofType(HANDLE_ADD_CUSTOM_LOG)
    .pluck('payload')
    .map(payload => ({ ...payload, ...checkBeforeAddCustomLog() }))
    .do(({ message }) => snackbarMessage({ message }))
    .do(({ isError }) => dispatchChangeIsErrorInAdd(isError))
    .filter(({ permission }) => permission)
    .do(({ title, tags, date, start, end }) => dispatchAddCustomLog(title, tags, date, start, end))
    .do(() => dispatchChangeTab('Home'))
    .ignoreElements()

export default combineEpics(
  effectSearchTagsEpic,
  addLogEpic,
  addCustomLogEpic,
  effectHandleAddTag,
  effectHandleAddLog,
  effectHandleAddCustomLog,
)
