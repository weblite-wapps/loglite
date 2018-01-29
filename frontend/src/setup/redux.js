// modules
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
// reducers and epics
import AppEpic from '../components/Main/App.effect'
import HomeEpic from '../components/components/Home/Main/Home.effect'
import AddEpic from '../components/components/Add/Main/Add.effect'
import ReportEpic from '../components/components/Report/Main/Report.effect'
import AppReducer from '../components/Main/App.reducer'
import HomeReducer from '../components/components/Home/Main/Home.reducer'
import AddReducer from '../components/components/Add/Main/Add.reducer'
import ReportReducer from '../components/components/Report/Main/Report.reducer'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/* eslint-enable */

const rootEpic = combineEpics(AppEpic, HomeEpic, AddEpic, ReportEpic)
const epicMiddleware = createEpicMiddleware(rootEpic)


const store = createStore(
  combineReducers({
    App: AppReducer,
    Home: HomeReducer,
    Add: AddReducer,
    Report: ReportReducer,
  }), composeEnhancers(applyMiddleware(epicMiddleware)))

const { dispatch, getState } = store


window.store = store
export default store
export { dispatch, getState }
