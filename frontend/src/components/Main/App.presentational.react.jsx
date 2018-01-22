// Modules
import React from 'react'
import annyang from 'annyang'
import { CSVDownload } from 'react-csv'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Tabs, { Tab } from 'material-ui/Tabs'
import { CircularProgress } from 'material-ui/Progress'
// components
import Snackbar from 'weblite-web-snackbar'
// scssClasses
import scssClasses from './App.scss'


const theme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        height: '50px',
      },
    },
    MuiTabIndicator: {
      root: {
        height: '5px',
      },
    },
    MuiCircularProgress: {
      primaryColor: {
        color: 'white',
      },
    },
  },
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      aboutMode: false,
    }
    this.handleChange = this._handleChange.bind(this)
    this.goToAbout = this._goToAbout.bind(this)
  }

  componentWillMount() {
    const { changeTab, location } = this.props
    const tabIndex = R.slice(1, R.length(location.pathname), location.pathname)
    if (tabIndex === 'About') this.setState({ aboutMode: true })
    else if (!tabIndex) changeTab('Home')
    else changeTab(tabIndex)

    const commands = {
      Home: () => {
        this.props.history.push('')
        this.props.changeTab('Home')
      },
      Add: () => {
        this.props.history.push('/Add')
        this.props.changeTab('Add')
      },
      Report: () => {
        this.props.history.push('/Report')
        this.props.changeTab('Report')
      },
      Export: () => {
        this.props.convertJSONToCSV()
      },
    }
    annyang.addCommands(commands)
    annyang.start({ autoRestart: true, continuous: false })
  }

  componentDidMount() {
    this.props.fetchTodayData()
  }

  _handleChange(value) {
    this.setState({ aboutMode: false })
    if (value === 'Home') this.props.history.push('/')
    else this.props.history.push(`/${value}`)
    this.props.changeTab(value)
  }

  _goToAbout() {
    this.setState({ aboutMode: true })
    this.props.history.push('/About')
  }

  render() {
    const { isLoading, tabIndex, CSV } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <div className={scssClasses.root}>
          <div
            className={scssClasses.logoContainer}
            onClick={this.goToAbout}
            role="button"
            tabIndex="0"
          >
            <div className={isLoading ? scssClasses.loading : scssClasses.normal}>
              <CircularProgress size={40} color="primary" className={scssClasses.progress} />
              <img alt="loglite logo" src="assets/logo.jpg" className={scssClasses.logo} />
            </div>
          </div>
          <Tabs
            value={tabIndex}
            onChange={(event, value) => this.handleChange(value)}
            indicatorColor={this.state.aboutMode ? '#cfcfcf' : '#000000'}
            fullWidth
            centered
            className={scssClasses.Tabs}
          >
            <Tab label="Home" value="Home" className={scssClasses.Tab} />
            <Tab label="Add" value="Add" className={scssClasses.Tab} />
            <Tab label="Report" value="Report" className={scssClasses.Tab} />
          </Tabs>
          <Snackbar location={{ vertical: 'bottom', horizontal: 'right' }} />
          {
            CSV ?
              <CSVDownload
                data={CSV}
                separator=";"
                filename="LogliteReport.csv"
                target="_blank"
              /> : null
          }
        </div>
      </MuiThemeProvider>
    )
  }
}


App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  tabIndex: PropTypes.string.isRequired,
  CSV: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired,
  fetchTodayData: PropTypes.func.isRequired,
  convertJSONToCSV: PropTypes.func.isRequired,
}

export default withRouter(App)
