// modules
import React from 'react'
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
    const { log: { _id, times }, setSecondsElapsed, countinueCounting } = this.props
    const len = times.length
    if (len && times[len - 1].end === 'running') {
      setSecondsElapsed(sumTimes(times) + differenceInSeconds(new Date(),
        times[len - 1].start))
      countinueCounting(_id)
    }
  }

  componentDidMount() {
    const { log: { _id, times }, changeRunningId } = this.props
    const len = times.length
    if (len && times[len - 1].end === 'running') changeRunningId(_id)
  }

  _handleStartClick() {
    const now = new Date()
    const {
      log: { _id, times }, runningId, onStartClick, onStopClick, setSecondsElapsed,
    } = this.props
    if (runningId) onStopClick(runningId, now)
    setSecondsElapsed(sumTimes(times))
    onStartClick(_id, now)
  }

  _handleStopClick() {
    const now = new Date()
    const { log: { _id, times }, addLogToNextDay, onStopClick } = this.props
    const len = times.length
    if (isWithinRange(formatTime('23:59'), times[len - 1].start, now)) {
      addLogToNextDay(now, formattedDate(now))
      onStopClick(_id, previousDay(formatTime('23:59')))
    } else {
      onStopClick(_id, now)
    }
  }

  render() {
    const {
      runningId, secondsElapsed, log: { _id, title, times }, workDuration, isLoading,
    } = this.props
    const len = times.length
    return (
      <div>
        <List dense disablePadding className={scssClasses.list}>
          <ListItem dense disableGutters>
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
            <ListItemSecondaryAction>
              {
                len && times[len - 1].end === 'running' ?
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
          <Collapse component="li" in={_id === runningId} timeout="auto" unmountOnExit>
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
  secondsElapsed: PropTypes.number.isRequired,
  log: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    times: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
  }).isRequired,
  workDuration: PropTypes.string.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  addLogToNextDay: PropTypes.func.isRequired,
  changeRunningId: PropTypes.func.isRequired,
  setSecondsElapsed: PropTypes.func.isRequired,
  countinueCounting: PropTypes.func.isRequired,
}
