// Modules
import React from 'react'
import PropTypes from 'prop-types'
import Tabs, { Tab } from 'material-ui/Tabs'
import { CircularProgress } from 'material-ui/Progress'
// components
import Snackbar from 'weblite-web-snackbar'
// css
import scssClasses from './App.scss'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleWappMode = this._handleWappMode.bind(this)
    this.handleNormalMode = this._handleNormalMode.bind(this)
  }

  componentDidMount() {
    if (window.W && window.W.wisId) this.handleWappMode()
    else this.handleNormalMode()
    window.addEventListener('focus', () => this.props.checkToSetSecondsElapsed())
  }

  _handleWappMode() {
    const { setAPI, fetchTodayData } = this.props
    window.W.loadData().then(({ creator, user }) => {
      setAPI(creator, user)
      fetchTodayData()
    })
  }

  _handleNormalMode() {
    const { setAPI, fetchTodayData } = this.props
    setAPI(true, { name: 'Ali', id: '110' })
    fetchTodayData()
  }

  render() {
    const { isLoading, tabIndex, aboutMode, setAboutMode, changeTab } = this.props
    return (
      <div className={scssClasses.root}>
        <div
          className={scssClasses.logoContainer}
          onClick={() => setAboutMode(true)}
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
          onChange={(event, value) => changeTab(value)}
          indicatorColor={aboutMode ? '#cfcfcf' : '#000000'}
          fullWidth
          centered
          className={scssClasses.Tabs}
        >
          <Tab label="Home" value="Home" className={scssClasses.Tab} />
          <Tab label="Add" value="Add" className={scssClasses.Tab} />
          <Tab label="Report" value="Report" className={scssClasses.Tab} />
        </Tabs>
        <Snackbar location={{ vertical: 'bottom', horizontal: 'right' }} />
      </div>
    )
  }
}


App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  tabIndex: PropTypes.string.isRequired,
  aboutMode: PropTypes.bool.isRequired,
  setAboutMode: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired,
  fetchTodayData: PropTypes.func.isRequired,
  setAPI: PropTypes.func.isRequired,
  checkToSetSecondsElapsed: PropTypes.func.isRequired,
}

export default App
