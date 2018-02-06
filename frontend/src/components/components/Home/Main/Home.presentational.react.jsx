// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
// icons
import AddIcon from 'material-ui-icons/Add'
// components
import Summary from '../components/Summary/Summary.container.react'
import TodayWork from '../components/TodayWork/TodayWork.container.react'
// helpers
import { formattedDate } from '../../../../helper/functions/date.helper'
// css
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
    const { logs, runningId } = this.props
    return (
      <div className={scssClasses.container}>
        <Summary />
        <Divider />
        <div>
          {
            logs.filter(log => log.date === formattedDate(new Date()) || (log._id === runningId))
              .map(log => (
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
    )
  }
}


Home.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  runningId: PropTypes.string.isRequired,
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeTab: PropTypes.func.isRequired,
}


export default withRouter(Home)
