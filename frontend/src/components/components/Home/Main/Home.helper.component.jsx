// modules
import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
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
    <Button fab onClick={onClick}>
      <AddIcon />
    </Button>
  </div>
)

FabButton.propTypes = { onClick: PropTypes.func.isRequired }
