// modules
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createMemoryHistory'
// reducers
import AppReducer from '../components/Main/App.reducer'
import HomeReducer from '../components/components/Home/Main/Home.reducer'
import AddReducer from '../components/components/Add/Main/Add.reducer'
import ReportReducer from '../components/components/Report/Main/Report.reducer'
import EditReducer from '../components/components/Edit/Main/Edit.reducer'
import SnackbarReducer from '../components/components/Snackbar/Snackbar.reducer'
// epics
import AppEpic from '../components/Main/App.effect'
import HomeEpic from '../components/components/Home/Main/Home.effect'
import AddEpic from '../components/components/Add/Main/Add.effect'
import ReportEpic from '../components/components/Report/Main/Report.effect'
import EditEpic from '../components/components/Edit/Main/Edit.effect'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/* eslint-enable */

// redux observable
const rootEpic = combineEpics(AppEpic, HomeEpic, AddEpic, ReportEpic, EditEpic)
const epicMiddleware = createEpicMiddleware(rootEpic)

const store = createStore(
  combineReducers({
    App: AppReducer,
    Home: HomeReducer,
    Add: AddReducer,
    Report: ReportReducer,
    Edit: EditReducer,
    Snackbar: SnackbarReducer,
    router: routerReducer,
  }),
  composeEnhancers(applyMiddleware(middleware, epicMiddleware)),
)

export const { dispatch, getState } = store
export default store
// window.store = store
