// Modules
import React from 'react'
import PropTypes from 'prop-types'
// helpers
import { Logo, Tabs } from './App.helper.component'
// styles
import './App.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleWappMode = this._handleWappMode.bind(this)
    this.handleNormalMode = this._handleNormalMode.bind(this)
  }

  componentDidMount() {
    if (window.W && window.W.wisId) this.handleWappMode()
    else this.handleNormalMode()
    window.addEventListener('focus', () => {
      console.log('in checkToSetSecondsElapsed focus')
      this.props.checkToSetSecondsElapsed()
    })
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
      <div className="AppBar">
        <Logo {...this.props} />
        <Tabs {...this.props} />
      </div>
    )
  }
}

App.propTypes = {
  fetchTodayData: PropTypes.func.isRequired,
  setAPI: PropTypes.func.isRequired,
  checkToSetSecondsElapsed: PropTypes.func.isRequired,
}
