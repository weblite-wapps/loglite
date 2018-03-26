// modules
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
// icons
import AddIcon from 'material-ui-icons/Add'
// components
import Summary from '../components/Summary/Summary.container.react'
import TodayWork from '../components/TodayWork/TodayWork.container.react'
// helpers
import { checkIsRunning } from './Home.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
// css
import scssClasses from './Home.scss'

const Home = ({ logs, changeTab }) => (
  <div className={scssClasses.container}>
    <Summary />
    <Divider />
    <div>
      {
        logs
          .filter(log => log.date === formattedDate(new Date()) || checkIsRunning(log))
          .map(log => (
            <TodayWork
              key={log._id}
              log={log}
            />
          ))
      }
    </div>
    <div className={scssClasses.button}>
      <Button fab onClick={() => changeTab('Add')}>
        <AddIcon />
      </Button>
    </div>
  </div>
)


Home.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeTab: PropTypes.func.isRequired,
}


export default Home
