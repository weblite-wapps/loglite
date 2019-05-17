// modules
import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { isWithinRange, differenceInSeconds } from "date-fns";
// helpers
import {
  PinButton,
  BriefInfo,
  ActionButtons,
  Collapse
} from "./TodayWork.helper.component";
import {
  formatTime,
  sumTimes,
  getNow,
  getTimeZone,
} from "../../../../../helper/functions/time.helper";
import {
  previousDay,
  formattedDate
} from "../../../../../helper/functions/date.helper";
// styles
import "./TodayWork.scss";

export default class TodayWork extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartClick = this._handleStartClick.bind(this);
    this.handleStopClick = this._handleStopClick.bind(this);
  }

  componentWillMount() {
    const {
      log: { _id, times },
      setSecondsElapsed, 
      countinueCounting
    } = this.props;
    const len = times.length;
    if (len && times[len - 1].end === "running") { 
      console.log("now:", getNow(), "start:", getTimeZone(times[len - 1].start), differenceInSeconds(getNow(), getTimeZone(times[len - 1].start)))
      setSecondsElapsed(
        sumTimes(times) + differenceInSeconds(getNow(), getTimeZone(times[len - 1].start))
      );
      countinueCounting(_id);
    }
  }

  componentDidMount() {
    const {
      log: { _id, times },
      changeRunningId
    } = this.props;
    const len = times.length;
    if (len && times[len - 1].end === "running") changeRunningId(_id);
  }

  _handleStartClick() {
    const {
      log: { _id, times },
      runningId,
      onStartClick,
      onStopClick,
      setSecondsElapsed
    } = this.props;
    if (runningId) onStopClick(runningId, getNow(), _id, times); 
    else {
      setSecondsElapsed(sumTimes(times));
      onStartClick(_id);
    }
  }

  _handleStopClick() {
    const now = getNow();
    const {
      log: { _id, times },
      addLogToNextDay,
      onStopClick
    } = this.props;
    const len = times.length;
    if (
      isWithinRange(
        previousDay(formatTime("24:00:00")),
        times[len - 1].start,
        now
      )
    ) {
      addLogToNextDay(now, formattedDate(now));
      onStopClick(_id, previousDay(formatTime("24:00:00")), null, null);
    } else {
      onStopClick(_id, getNow(), null, null);
    }
  }

  render() {
    const {
      log: { times }
    } = this.props;
    const len = times.length;

    return (
      <>
        <List dense disablePadding className="list">
          <ListItem dense disableGutters>
            <PinButton {...this.props} />
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
      </>
    );
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
  countinueCounting: PropTypes.func.isRequired
};
