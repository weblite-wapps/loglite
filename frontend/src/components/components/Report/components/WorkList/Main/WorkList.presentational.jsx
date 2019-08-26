// modules
import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import MuiButton from '@material-ui/core/Button'
import { differenceInSeconds } from 'date-fns'
// components
import Popover from '../../../../../../helper/components/Popover/Popover.presentational'
// helpers
import { TitleAndDuration, Tags } from './WorkList.helper.component'
import {
  sumTimes,
  getNow,
} from '../../../../../../helper/functions/time.helper'
// styles
import './WorkList.scss'
import styles from '../../../../../../helper/components/Button/Button.style'

class WorkList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { anchorEl: null }
    this.handleOpenPopover = this._handleOpenPopover.bind(this)
    this._changeAnchorEl = this._changeAnchorEl.bind(this)
  }

  componentWillMount() {
    const {
      log: { _id, times },
      setSecondsElapsed,
      countinueCounting,
    } = this.props
    const len = times.length

    if (len && times[len - 1].end === 'running') {
      setSecondsElapsed(
        sumTimes(times) + differenceInSeconds(getNow(), times[len - 1].start),
      )
      countinueCounting(_id)
    }
  }

  _changeAnchorEl(anchorEl) {
    this.setState({ anchorEl })
  }

  _handleOpenPopover() {
    const {
      changePopoverId,
      log: { _id },
    } = this.props
    this._changeAnchorEl(findDOMNode(this.button))
    changePopoverId(_id)
  }

  render() {
    const {
      classes,
      userId,
      selectedUser,
      log: { _id, times },
      log,
      popoverId,
      changePopoverId,
      handleDeleteLog,
      editClick,
    } = this.props
    const len = times.length
    const anchorEl = this.state.anchorEl
    return (
      <>
        <List disablePadding>
          <TitleAndDuration {...this.props} len={len} />
          <Tags {...this.props} />
          {selectedUser === userId && (
            <div className="workList-button">
              <MuiButton
                ref={node => {
                  this.button = node
                }}
                variant="contained"
                onClick={() => this._handleOpenPopover()}
                classes={{ raised: classes.WorkList }}
              >
                Delete
              </MuiButton>
              <Popover
                popoverIsOpen={_id === popoverId}
                anchorEl={anchorEl}
                anchorReference="anchorEl"
                onClose={() => changePopoverId('')}
                onYep={handleDeleteLog}
                onNop={() => changePopoverId('')}
              />
              <MuiButton
                variant="contained"
                onClick={() => editClick(log)}
                classes={{ raised: classes.WorkList }}
              >
                Edit
              </MuiButton>
            </div>
          )}
        </List>
        <Divider light />
      </>
    )
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
  setSecondsElapsed: PropTypes.func.isRequired,
  countinueCounting: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
}

WorkList.defaultProps = {
  editMode: false,
}

export default withStyles(styles)(WorkList)
