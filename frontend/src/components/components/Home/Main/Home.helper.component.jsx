// modules
import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
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
    <Button variant="fab" onClick={onClick}>
      <FlagIcon />
    </Button>
  </div>
)

FabButton.propTypes = { onClick: PropTypes.func.isRequired }
