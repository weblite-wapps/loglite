// Modules
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles'
// Setup
import store from './redux'
// Component
import App from '../components/Main/App.container.react'
import Home from '../components/components/Home/Main/Home.container.react'
import Add from '../components/components/Add/Main/Add.container.react'
import Report from '../components/components/Report/Main/Report.container.react'
import About from '../components/components/About/About'
// scssClasses
import scssClasses from './root.scss'
import theme from '../helper/style/appTheme'


export default function root() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className={scssClasses.container}>
            <App />
            <Route exact path="/" component={Home} />
            <Route path="/Add" component={Add} />
            <Route path="/Report" component={Report} />
            <Route path="/About" component={About} />
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
  )
}
