// Modules
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Tabs, { Tab } from 'material-ui/Tabs'
import { CircularProgress } from 'material-ui/Progress'
// components
import Snackbar from 'weblite-web-snackbar'
// css
import scssClasses from './App.scss'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { aboutMode: false }
    this.handleChangeTab = this._handleChangeTab.bind(this)
    this.goToAbout = this._goToAbout.bind(this)
    this.handleWappMode = this._handleWappMode.bind(this)
    this.handleNormalMode = this._handleNormalMode.bind(this)
  }

  componentDidMount() {
    if (window.W && window.W.wisId) this.handleWappMode()
    else this.handleNormalMode()
    window.addEventListener('focus', () => this.props.checkToSetSecondsElapsed())
  }

  _handleChangeTab(value) {
    const { changeTab, history } = this.props
    this.setState({ aboutMode: false })
    if (value === 'Home') history.push('/')
    else history.push(`/${value}`)
    changeTab(value)
  }

  _goToAbout() {
    this.setState({ aboutMode: true })
    this.props.history.push('/About')
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
    const { isLoading, tabIndex } = this.props
    return (
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
          onChange={(event, value) => this.handleChangeTab(value)}
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
      </div>
    )
  }
}


App.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  tabIndex: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired,
  fetchTodayData: PropTypes.func.isRequired,
  setAPI: PropTypes.func.isRequired,
  checkToSetSecondsElapsed: PropTypes.func.isRequired,
}

export default withRouter(App)
