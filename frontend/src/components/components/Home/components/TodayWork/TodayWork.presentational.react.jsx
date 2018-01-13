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
    this.state = {
      startTimeOfRange: null,
      secondsElapsed: 0,
      lastClearedIncrementer: null,
    }
    this.incrementer = null
  }

  componentWillMount() {
    const { log } = this.props
    const len = log.times.length
    if (len && log.times[len - 1].end === 'running') {
      this.setState({
        secondsElapsed: sumTimes(log.times) + differenceInSeconds(new Date(),
          log.times[len - 1].start),
      })
      this.incrementer = setInterval(() =>
        this.setState({ secondsElapsed: this.state.secondsElapsed + 1 })
        , 1000)
    } else {
      this.setState({ secondsElapsed: sumTimes(log.times) })
    }
  }

  componentDidMount() {
    const { log, toggleExpanded, toggleIsRunning } = this.props
    const len = log.times.length
    if (!log.expanded && len && log.times[len - 1].end === 'running') {
      toggleExpanded()
      toggleIsRunning()
    }
  }

  componentWillUnmount() {
    clearInterval(this.incrementer)
  }

  _handleStartClick() {
    const { isRunning, toggleExpanded, toggleIsRunning,
      onStartClick, changeSnackbarStage } = this.props
    if (isRunning) {
      changeSnackbarStage(true, 'Stop the other stopwatch first!')
    } else {
      toggleIsRunning()
      toggleExpanded()
      this.setState({ startTimeOfRange: new Date() })
      onStartClick()
      this.incrementer = setInterval(() =>
        this.setState({ secondsElapsed: this.state.secondsElapsed + 1 })
        , 1000)
    }
  }

  _handleStopClick() {
    const { toggleExpanded, toggleIsRunning, addLogToNextDay, onStopClick } = this.props
    clearInterval(this.incrementer)
    this.setState({ lastClearedIncrementer: this.incrementer })
    toggleExpanded()
    toggleIsRunning()
    if (isWithinRange(formatTime('24:00'), this.state.startTimeOfRange, new Date())) {
      addLogToNextDay(new Date(), format(new Date(), 'YYYY-MM-DD'))
      onStopClick(previousDay(formatTime('24:00')))
    } else {
      onStopClick(new Date())
    }
  }

  render() {
    const { secondsElapsed, lastClearedIncrementer } = this.state
    const { isRunning, log, workDuration } = this.props
    const len = log.times.length
    const button =
      secondsElapsed === 0 || this.incrementer === lastClearedIncrementer ?
        (
          <IconButton onClick={this.handleStartClick}>
            <Play className={scssClasses.icon} />
          </IconButton>
        ) : (
          <IconButton onClick={this.handleStopClick}>
            <Pause className={scssClasses.icon} />
          </IconButton>
        )
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
                { (!isRunning || (len && log.times[len - 1].end === 'running')) ?
                    button : null
                }
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse component="li" in={log.expanded} timeout="auto" unmountOnExit>
              <Divider light />
              <div className={scssClasses.stopwatch}>
                <Typography type="subheading">
                  {formattedSeconds(secondsElapsed)}
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
  log: PropTypes.shape({
    title: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
    times: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  isRunning: PropTypes.bool.isRequired,
  workDuration: PropTypes.string.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  addLogToNextDay: PropTypes.func.isRequired,
  toggleIsRunning: PropTypes.func.isRequired,
  changeSnackbarStage: PropTypes.func.isRequired,
}
