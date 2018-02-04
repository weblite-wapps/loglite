// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemSecondaryAction } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import Divider from 'material-ui/Divider'
import isWithinRange from 'date-fns/is_within_range'
import differenceInSeconds from 'date-fns/difference_in_seconds'
// icons
import Play from 'material-ui-icons/PlayArrow'
import Pause from 'material-ui-icons/Pause'
// helpers
import { formattedSeconds, formattedName } from './TodayWork.helper'
import { formatTime, sumTimes } from '../../../../../helper/functions/time.helper'
import { previousDay, formattedDate } from '../../../../../helper/functions/date.helper'
// css
import scssClasses from './TodayWork.scss'


export default class TodayWork extends React.Component {
  constructor(props) {
    super(props)
    this.handleStartClick = this._handleStartClick.bind(this)
    this.handleStopClick = this._handleStopClick.bind(this)
  }

  componentWillMount() {
    const { log, setSecondsElapsed, countinueCounting } = this.props
    const len = log.times.length
    if (len && log.times[len - 1].end === 'running') {
      setSecondsElapsed(sumTimes(log.times) + differenceInSeconds(new Date(),
        log.times[len - 1].start))
      countinueCounting(log._id)
    }
  }

  componentDidMount() {
    const { log, changeExpandingId, changeRunningId } = this.props
    const len = log.times.length
    if (!log.expanded && len && log.times[len - 1].end === 'running') {
      changeExpandingId(log._id)
      changeRunningId(log._id)
    }
  }

  _handleStartClick() {
    const now = new Date()
    const { log, runningId, onStartClick, onStopClick, setSecondsElapsed } = this.props
    if (runningId) {
      onStopClick(runningId, now)
    }
    setSecondsElapsed(sumTimes(log.times))
    onStartClick(log._id, now)
  }

  _handleStopClick() {
    const now = new Date()
    const { log, addLogToNextDay, onStopClick } = this.props
    const len = log.times.length
    if (isWithinRange(formatTime('23:59'), log.times[len - 1].start, now)) {
      addLogToNextDay(now, formattedDate(now))
      onStopClick(log._id, previousDay(formatTime('23:59')))
    } else {
      onStopClick(log._id, now)
    }
  }

  render() {
    const { expandingId, secondsElapsed, log, workDuration, isLoading } = this.props
    const len = log.times.length
    return (
      <div>
        <List dense disablePadding className={scssClasses.list}>
          <ListItem dense disableGutters>
            <Typography type="body2">
              {
                formattedName(log.title) === log.title ?
                  <span>{formattedName(log.title)}</span> :
                  <Tooltip title={log.title} placement="bottom" enterDelay={300} leaveDelay={300}>
                    <span>{formattedName(log.title)}</span>
                  </Tooltip>
              }
              <span className={scssClasses.time}>
                &nbsp;| { R.test(/^NaN/, workDuration) ? 'Running...' : workDuration }
              </span>
            </Typography>
            <ListItemSecondaryAction>
              {
                len && log.times[len - 1].end === 'running' ?
                  (
                    <IconButton
                      disabled={isLoading}
                      onClick={this.handleStopClick}
                    >
                      <Pause className={scssClasses.icon} />
                    </IconButton>
                  ) : (
                    <IconButton
                      disabled={isLoading}
                      onClick={this.handleStartClick}
                    >
                      <Play className={scssClasses.icon} />
                    </IconButton>
                  )
              }
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse component="li" in={log._id === expandingId} timeout="auto" unmountOnExit>
            <Divider light inset />
            <div className={scssClasses.stopwatch}>
              <Typography type="subheading">
                {formattedSeconds(secondsElapsed)}
              </Typography>
            </div>
          </Collapse>
        </List>
        <Divider light />
      </div>
    )
  }
}

TodayWork.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  runningId: PropTypes.string.isRequired,
  expandingId: PropTypes.string.isRequired,
  secondsElapsed: PropTypes.number.isRequired,
  log: PropTypes.shape({}).isRequired,
  workDuration: PropTypes.string.isRequired,
  changeExpandingId: PropTypes.func.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  addLogToNextDay: PropTypes.func.isRequired,
  changeRunningId: PropTypes.func.isRequired,
  setSecondsElapsed: PropTypes.func.isRequired,
  countinueCounting: PropTypes.func.isRequired,
}
