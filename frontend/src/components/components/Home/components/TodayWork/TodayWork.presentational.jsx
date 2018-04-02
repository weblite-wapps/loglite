// modules
import React from 'react'
import PropTypes from 'prop-types'
import List, { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { isWithinRange, differenceInSeconds } from 'date-fns'
// helpers
import { BriefInfo, ActionButtons, Collapse } from './TodayWork.helper.component'
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
    if (isWithinRange(previousDay(formatTime('24:00:00')), times[len - 1].start, now)) {
      addLogToNextDay(now, formattedDate(now))
      onStopClick(_id, previousDay(formatTime('24:00:00')))
    } else {
      onStopClick(_id, now)
    }
  }

  render() {
    const { log: { times } } = this.props
    const len = times.length

    return (
      <React.Fragment>
        <List dense disablePadding className={scssClasses.list}>
          <ListItem dense disableGutters>
            <BriefInfo {...this.props} />
            <ActionButtons
              {...this.props}
              len={len}
              onStart={this.handleStartClick}
              onStop={this.handleStopClick}
            />
          </ListItem>
          <Collapse {...this.props} />
        </List>
        <Divider light />
      </React.Fragment>
    )
  }
}

TodayWork.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  runningId: PropTypes.string.isRequired,
  secondsElapsed: PropTypes.number.isRequired,
  log: PropTypes.shape({}).isRequired,
  workDuration: PropTypes.string.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  addLogToNextDay: PropTypes.func.isRequired,
  changeRunningId: PropTypes.func.isRequired,
  setSecondsElapsed: PropTypes.func.isRequired,
  countinueCounting: PropTypes.func.isRequired,
}
