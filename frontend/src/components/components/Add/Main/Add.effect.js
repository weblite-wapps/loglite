// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { formatTime, getRequest, postRequest } from './Add.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
// actions
import { ADD_LOG, ADD_CUSTOM_LOG, restoreLog } from '../../../Main/App.action'
import { SET_QUERY_IN_ADD, fetchTagsInAdd, loadTagsDataInAdd, resetInputs } from './Add.action'
// views
import { wisView, userIdView } from '../../../Main/App.reducer'


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

export default combineEpics(
  effectSearchTagsEpic,
  addLogEpic,
  addCustomLogEpic,
)
