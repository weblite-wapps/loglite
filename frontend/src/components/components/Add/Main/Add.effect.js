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
        .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .map(({ text }) => fetchTagsInAdd(JSON.parse(text)))

const addLogEpic = action$ =>
  action$.ofType(ADD_LOG)
    .pluck('payload')
    .mergeMap(payload => Promise.all([
      postRequest('/saveLog')
        .send({
          title: payload.title,
          tags: payload.tags,
          times: [],
          date: formattedDate(new Date()),
          userId: userIdView(),
          wis: wisView(),
        })
        .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null),
      postRequest('/saveTags')
        .send({
          tags: payload.tags,
          userId: userIdView(),
          wis: wisView(),
        }),
    ]))
    .mergeMap(success =>
      [restoreLog(JSON.parse(success[0].text)), loadTagsDataInAdd(JSON.parse(success[1].text))])

const addCustomLogEpic = action$ =>
  action$.ofType(ADD_CUSTOM_LOG)
    .pluck('payload')
    .mergeMap(payload => Promise.all([
      postRequest('/saveCustomLog')
        .send({
          title: payload.title,
          tags: payload.tags,
          times: [{
            start: formatTime(payload.start),
            end: formatTime(payload.end),
          }],
          date: payload.date,
          userId: userIdView(),
          wis: wisView(),
        })
        .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null),
      postRequest('/saveTags')
        .send({
          tags: payload.tags,
          userId: userIdView(),
          wis: wisView(),
        }),
    ]))
    .mergeMap(success => [
      success[0].text === 'added successfully!' ? resetInputs() : restoreLog(JSON.parse(success[0].text)),
      loadTagsDataInAdd(JSON.parse(success[1].text))])

export default combineEpics(
  effectSearchTagsEpic,
  addLogEpic,
  addCustomLogEpic,
)
