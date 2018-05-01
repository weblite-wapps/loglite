// Modules
import React from 'react'
import PropTypes from 'prop-types'
// local modules
import Snackbar from 'weblite-web-snackbar'
// helpers
import { Logo, Tabs } from './App.helper.component'
// css
import scssClasses from './App.scss'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleWappMode = this._handleWappMode.bind(this)
    this.handleNormalMode = this._handleNormalMode.bind(this)
  }

  componentDidMount() {
    if (window.W && window.W.wisId) this.handleWappMode()
    else this.handleNormalMode()
    window.addEventListener('focus', () => this.props.checkToSetSecondsElapsed())
    window.addEventListener('blur', () => this.props.checkToSetBlur())
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
    return (
      <div className={this.props.blur ? scssClasses.blur : scssClasses.AppBar}>
        <Logo {...this.props} />
        <Tabs {...this.props} />
        <Snackbar location={{ vertical: 'bottom', horizontal: 'right' }} />
      </div>
    )
  }
}

App.propTypes = {
  blur: PropTypes.bool.isRequired,
  fetchTodayData: PropTypes.func.isRequired,
  setAPI: PropTypes.func.isRequired,
  checkToSetSecondsElapsed: PropTypes.func.isRequired,
  checkToSetBlur: PropTypes.func.isRequired,
}
