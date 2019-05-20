// Modules
import React, { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { MuiThemeProvider } from '@material-ui/core/styles'
// Setup
import store, { history } from './redux'
// Component
import App from '../components/Main/App.container.react'
import About from '../components/components/About/About.jsx'
import Loading from '../helper/components/Loading/Loading.presentational'
import Snackbar from '../components/components/Snackbar/Snackbar.container.react'
// styles
import './root.scss'
import theme from '../helper/style/appTheme'
// lazy loading
const Home = lazy(() =>
  import('../components/components/Home/Main/Home.container.react'),
)
const Add = lazy(() =>
  import('../components/components/Add/Main/Add.container.react'),
)
const Report = lazy(() =>
  import('../components/components/Report/Main/Report.container.react'),
)

const Edit = lazy(() =>
  import('../components/components/Edit/Main/Edit.container.react'),
)
// const About = lazy(() => import('../components/components/About/About.jsx'))

export default () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <div className="app-container ">
          <App />
          <Snackbar location={{ vertical: 'bottom', horizontal: 'right' }} />

          <Suspense fallback={<Loading />}>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/Add" render={() => <Add />} />
            <Route path="/Report" render={() => <Report />} />
            <Route path="/About" render={() => <About />} />
            <Route path="/Edit" render={() => <Edit />} />
          </Suspense>
        </div>
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
)
