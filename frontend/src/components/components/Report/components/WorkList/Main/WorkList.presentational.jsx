// modules
import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import MuiButton from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { differenceInSeconds } from "date-fns";
// components
import Popover from "../components/Popover.presentational"; 
// helpers
import { TitleAndDuration, Tags } from "./WorkList.helper.component";
import { sumTimes } from "../../../../../../helper/functions/time.helper";
// styles
import "./WorkList.scss";
import styles from "../../../../../../helper/components/Button/Button.style";

class WorkList extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenPopover = this._handleOpenPopover.bind(this);
  }

  componentWillMount() {
    const {
      log: { _id, times },
      setSecondsElapsed,
      countinueCounting,
    } = this.props;
    const len = times.length;

    if (len && times[len - 1].end === "running") {
      setSecondsElapsed(
        sumTimes(times) + differenceInSeconds(new Date(), times[len - 1].start) - 120
      );
      countinueCounting(_id);
    }
  }

  _handleOpenPopover() {
    const {
      changeAnchorEl,
      changePopoverId,
      log: { _id }
    } = this.props;
    changeAnchorEl(findDOMNode(this.button));
    changePopoverId(_id);
  }

  render() {
    const {
      classes,
      userId,
      selectedUser,
      log: { _id, times },
      popoverId,
      changePopoverId,
      handleDeleteLog,
      anchorEl
    } = this.props;
    const len = times.length;

    return (
      <React.Fragment>
        <List disablePadding>
          <TitleAndDuration {...this.props} len={len} />
          <Tags {...this.props} />
          {selectedUser === userId && (
            <div className="workList-button">
              <MuiButton
                ref={node => { 
                  this.button = node;
                }}
                variant="contained"
                onClick={this.handleOpenPopover}
                classes={{ raised: classes.WorkList }}
              >
                Delete
              </MuiButton>
              <Popover
                popoverIsOpen={_id === popoverId}
                anchorEl={anchorEl}
                anchorReference="anchorEl"
                onClose={() => changePopoverId("")}
                onYep={handleDeleteLog}
                onNop={() => changePopoverId("")}
              />
              <Tooltip 
                title="Coming Soon! :D"
                placement="left"
                enterDelay={50}
                leaveDelay={150}
              >
                <MuiButton
                  variant="contained"
                  // onClick={this.handleOpenPopover}
                  classes={{ raised: classes.WorkList }}
                >
                  Edit
                </MuiButton>
              </Tooltip>
            </div>
          )}
        </List>
        <Divider light />
      </React.Fragment>
    );
  }
}

WorkList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  log: PropTypes.shape({}).isRequired,
  userId: PropTypes.string.isRequired,
  selectedUser: PropTypes.string.isRequired,
  popoverId: PropTypes.string.isRequired,
  handleDeleteLog: PropTypes.func.isRequired,
  changePopoverId: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape({}),
  changeAnchorEl: PropTypes.func.isRequired,
  setSecondsElapsed: PropTypes.func.isRequired,
  countinueCounting: PropTypes.func.isRequired
};

WorkList.defaultProps = {
  anchorEl: null
};

export default withStyles(styles)(WorkList);
