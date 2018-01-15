// modules
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/debounceTime'
import format from 'date-fns/format'
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { formatTime, getRequest, postRequest } from './Add.helper'
// actions
import { ADD_LOG, ADD_CUSTOM_LOG, restoreLog, restoreCustomLog } from '../../../Main/App.action'
import {
  SET_QUERY_IN_ADD,
  fetchTagsInAdd,
  loadTagsDataInAdd,
  resetInputs,
} from './Add.action'

const effectSearchTagsEpic = (action$, { getState }) =>
  action$.ofType(SET_QUERY_IN_ADD)
    .pluck('payload')
    .filter(payload => payload.queryTag.trim() !== '')
    .debounceTime(250)
    .mergeMap(payload =>
      getRequest('/serachTags')
        .query({ wis: getState().App.wis, label: payload.queryTag })
        .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null))
    .map(success => fetchTagsInAdd(JSON.parse(success.text)))

const addLogEpic = (action$, { getState }) =>
  action$.ofType(ADD_LOG)
    .pluck('payload')
    .mergeMap(payload => Promise.all([
      postRequest('/saveLog')
        .send({
          title: payload.title,
          tags: payload.tags,
          times: [],
          date: format(new Date(), 'YYYY-MM-DD'),
          wis: getState().App.wis,
        })
        .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null),
      postRequest('/saveTags')
        .send({
          tags: payload.tags,
          wis: getState().App.wis,
        }),
    ]))
    .mergeMap(success =>
      [restoreLog(JSON.parse(success[0].text)), loadTagsDataInAdd(JSON.parse(success[1].text))])

const addCustomLogEpic = (action$, { getState }) =>
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
          wis: getState().App.wis,
        })
        .on('error', err => err.status !== 304 ? snackbarMessage({ message: 'Server dissonncted!' }) : null),
      postRequest('/saveTags')
        .send({
          tags: payload.tags,
          wis: getState().App.wis,
        }),
    ]))
    .mergeMap(success => [
      success[0].text === 'added successfully!' ? resetInputs() : restoreCustomLog(JSON.parse(success[0].text)),
      loadTagsDataInAdd(JSON.parse(success[1].text))])

export default combineEpics(
  effectSearchTagsEpic,
  addLogEpic,
  addCustomLogEpic,
)
