import { combineEpics } from 'redux-observable'
import 'rxjs'
import { UPDATE_LOG, dispatchToggleEditMode } from './Edit.action'

const submitEditEpic = action$ => action$.ofType(UPDATE_LOG).do(console.log)

export default combineEpics(submitEditEpic)
