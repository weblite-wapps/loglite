// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { MuiThemeProvider } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import format from 'date-fns/format'
// icons
import AddIcon from 'material-ui-icons/Add'
// components
import Summary from '../components/Summary/Summary.container.react'
import TodayWork from '../components/TodayWork/TodayWork.container.react'
// css
import { theme } from './Home.helper'
import scssClasses from './Home.scss'


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this._handleClick.bind(this)
  }

  _handleClick() {
    this.props.changeTab('Add')
    this.props.history.push('/Add')
  }
  render() {
    const { logs } = this.props
    const len = log => log.times.length
    return (
      <MuiThemeProvider theme={theme}>
        <div className={scssClasses.container}>
          <Summary />
          <Divider />
          <div>
            {
              logs.filter(log => log.date === format(new Date(), 'YYYY-MM-DD') ||
              (len(log) && log.times[len(log) - 1].end === 'running')).map(log => (
                <TodayWork
                  key={log._id}
                  log={log}
                />
              ))
            }
          </div>
          <div className={scssClasses.button}>
            <Button fab onClick={this.handleClick}>
              <AddIcon />
            </Button>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}


Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeTab: PropTypes.func.isRequired,
}


export default withRouter(Home)
