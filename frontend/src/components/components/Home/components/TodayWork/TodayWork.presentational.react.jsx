// modules
import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import List, { ListItem, ListItemSecondaryAction } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import Divider from 'material-ui/Divider'
import * as R from 'ramda'
import format from 'date-fns/format'
import isWithinRange from 'date-fns/is_within_range'
import differenceInSeconds from 'date-fns/difference_in_seconds'
// icons
import Play from 'material-ui-icons/PlayArrow'
import Pause from 'material-ui-icons/Pause'
// helpers
import { previousDay, formattedSeconds, formatTime, sumTimes, formattedName } from './TodayWork.helper'
// scssClasses
import scssClasses from './TodayWork.scss'

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        height: '30px',
        width: '30px',
        marginTop: '10px',
      },
    },
    MuiListItem: {
      dense: {
        paddingLeft: '30px',
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        paddingRight: '20px',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      light: {
        marginRight: '20px',
        marginLeft: '20px',
      },
    },
  },
})


export default class TodayWork extends React.Component {
  constructor(props) {
    super(props)
    this.handleStartClick = this._handleStartClick.bind(this)
    this.handleStopClick = this._handleStopClick.bind(this)
  }

  componentWillMount() {
    const { log, setSecondsElapsed, incrementSecondsElapsed } = this.props
    const len = log.times.length
    if (len && log.times[len - 1].end === 'running') {
      setSecondsElapsed(sumTimes(log.times) + differenceInSeconds(new Date(),
        log.times[len - 1].start))
      incrementSecondsElapsed()
    } else {
      setSecondsElapsed(sumTimes(log.times))
    }
  }

  componentDidMount() {
    const { log, toggleExpanded, changeRunningId } = this.props
    const len = log.times.length
    if (!log.expanded && len && log.times[len - 1].end === 'running') {
      toggleExpanded(log._id)
      changeRunningId(log._id)
    }
  }

  _handleStartClick() {
    const { log, runningId, toggleExpanded, changeRunningId,
      onStartClick, onStopClick } = this.props
    if (runningId) {
      onStopClick(runningId, new Date())
      toggleExpanded(runningId)
    }
    onStartClick()
    changeRunningId(log._id)
    toggleExpanded(log._id)
  }

  _handleStopClick() {
    const { log, toggleExpanded, changeRunningId, addLogToNextDay, onStopClick } = this.props
    toggleExpanded(log._id)
    changeRunningId('')
    if (isWithinRange(formatTime('24:00'), log.stopwatch.startTimeOfRange, new Date())) {
      addLogToNextDay(new Date(), format(new Date(), 'YYYY-MM-DD'))
      onStopClick(log._id, previousDay(formatTime('24:00')))
    } else {
      onStopClick(log._id, new Date())
    }
  }

  render() {
    const { log, workDuration } = this.props
    const len = log.times.length
    return (
      <MuiThemeProvider theme={theme}>
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
                      <IconButton onClick={this.handleStopClick}>
                        <Pause className={scssClasses.icon} />
                      </IconButton>
                    ) : (
                      <IconButton onClick={this.handleStartClick}>
                        <Play className={scssClasses.icon} />
                      </IconButton>
                    )
                }
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse component="li" in={log.expanded} timeout="auto" unmountOnExit>
              <Divider light />
              <div className={scssClasses.stopwatch}>
                <Typography type="subheading">
                  {formattedSeconds(log.stopwatch.secondsElapsed)}
                </Typography>
              </div>
            </Collapse>
          </List>
          <Divider />
        </div>
      </MuiThemeProvider>
    )
  }
}

TodayWork.propTypes = {
  runningId: PropTypes.string.isRequired,
  log: PropTypes.shape({
    title: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
    times: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  workDuration: PropTypes.string.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  addLogToNextDay: PropTypes.func.isRequired,
  changeRunningId: PropTypes.func.isRequired,
  setSecondsElapsed: PropTypes.func.isRequired,
  incrementSecondsElapsed: PropTypes.func.isRequired,
}
