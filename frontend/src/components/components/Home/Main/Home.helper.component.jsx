// modules
import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import FlagIcon from '@material-ui/icons/Flag'
// components
import TodayWork from '../components/TodayWork/TodayWork.container.react'
// helpers
import { checkIsRunning } from './Home.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
// style
import scssClasses from './Home.scss'


export const TodayWorkList = ({ logs }) => (
  logs
    .filter(log => log.date === formattedDate(new Date()) || checkIsRunning(log))
    .map(log => (
      <TodayWork
        key={log._id}
        log={log}
      />
    ))
)

TodayWorkList.propTypes = { logs: PropTypes.arrayOf(PropTypes.object).isRequired }


export const FabButton = ({ onClick }) => (
  <div className={scssClasses.button}>
    <Tooltip title="Leaderboard!" placement="right" enterDelay={100} leaveDelay={100}>
      <Button variant="fab" onClick={onClick}>
        <FlagIcon />
      </Button>
    </Tooltip>
  </div>
)

FabButton.propTypes = { onClick: PropTypes.func.isRequired }
