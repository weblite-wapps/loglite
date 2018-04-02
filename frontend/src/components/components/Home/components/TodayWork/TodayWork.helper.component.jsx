// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { ListItemSecondaryAction } from 'material-ui/List'
import MuiCollapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import Divider from 'material-ui/Divider'
// icons
import Play from 'material-ui-icons/PlayArrow'
import Pause from 'material-ui-icons/Pause'
// helpers
import { formattedSeconds, formattedName } from './TodayWork.helper'
// style
import scssClasses from './TodayWork.scss'


export const BriefInfo = ({ runningId, log: { _id, title }, workDuration }) => (
  <Typography type="body2">
    {
      formattedName(title) === title ?
        <span>{formattedName(title)}</span> :
        <Tooltip title={title} placement="bottom" enterDelay={300} leaveDelay={300}>
          <span>{formattedName(title)}</span>
        </Tooltip>
    }
    <span className={scssClasses.time}>
      &nbsp;| { runningId === _id ? 'Running...' : workDuration }
    </span>
  </Typography>
)

BriefInfo.propTypes = {
  runningId: PropTypes.string.isRequired,
  log: PropTypes.shape({}).isRequired,
  workDuration: PropTypes.string.isRequired,
}


export const ActionButtons = ({ log: { times }, isLoading, len, onStart, onStop }) => (
  <ListItemSecondaryAction>
    {
      len && times[len - 1].end === 'running' ?
        (
          <IconButton
            disabled={isLoading}
            onClick={onStop}
          >
            <Pause className={scssClasses.icon} />
          </IconButton>
        ) : (
          <IconButton
            disabled={isLoading}
            onClick={onStart}
          >
            <Play className={scssClasses.icon} />
          </IconButton>
        )
    }
  </ListItemSecondaryAction>
)

ActionButtons.propTypes = {
  log: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  len: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
}


export const Collapse = ({ runningId, log: { _id }, secondsElapsed }) => (
  <MuiCollapse component="li" in={_id === runningId} timeout="auto" unmountOnExit>
    <Divider light inset />
    <div className={scssClasses.stopwatch}>
      <Typography type="subheading">
        {formattedSeconds(secondsElapsed)}
      </Typography>
    </div>
  </MuiCollapse>
)

Collapse.propTypes = {
  runningId: PropTypes.string.isRequired,
  log: PropTypes.shape({}).isRequired,
  secondsElapsed: PropTypes.number.isRequired,
}
