// modules
import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import { differenceInSeconds } from 'date-fns'
// components
import Popover from '../components/Popover.presentational'
// helpers
import { TitleAndDuration, Tags } from './WorkList.helper.component'
import { sumTimes } from '../../../../../../helper/functions/time.helper'
// styles
import scssClasses from './WorkList.scss'
import styles from '../../../../../../helper/components/Button/Button.style'


class WorkList extends React.Component {
  constructor(props) {
    super(props)
    this.handleOpenPopover = this._handleOpenPopover.bind(this)
  }

  componentWillMount() {
    const { log: { _id, times }, setSecondsElapsed, countinueCounting } = this.props
    const len = times.length

    if (len && times[len - 1].end === 'running') {
      setSecondsElapsed(sumTimes(times) + differenceInSeconds(new Date(), times[len - 1].start))
      countinueCounting(_id)
    }
  }

  _handleOpenPopover() {
    const { changeAnchorEl, changePopoverId, log: { _id } } = this.props
    changeAnchorEl(findDOMNode(this.button))
    changePopoverId(_id)
  }

  render() {
    const { classes, userId, selectedUser, log: { _id, times }, popoverId,
      changePopoverId, deleteLog, anchorEl } = this.props
    const len = times.length

    return (
      <React.Fragment>
        <List disablePadding>
          <TitleAndDuration {...this.props} len={len} />
          <Tags {...this.props} />
          {
            selectedUser === userId &&
              <div className={scssClasses.button}>
                <Button
                  ref={(node) => { this.button = node }}
                  raised
                  onClick={this.handleOpenPopover}
                  classes={{ raised: classes.WorkList }}
                >
                  Delete
                </Button>
                <Popover
                  popoverIsOpen={_id === popoverId}
                  anchorEl={anchorEl}
                  anchorReference="anchorEl"
                  onClose={() => changePopoverId('')}
                  onYep={deleteLog}
                  onNop={() => changePopoverId('')}
                />
              </div>
          }
        </List>
        <Divider light />
      </React.Fragment>
    )
  }
}

WorkList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  log: PropTypes.shape({}).isRequired,
  userId: PropTypes.string.isRequired,
  selectedUser: PropTypes.string.isRequired,
  popoverId: PropTypes.string.isRequired,
  deleteLog: PropTypes.func.isRequired,
  changePopoverId: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape({}),
  changeAnchorEl: PropTypes.func.isRequired,
  setSecondsElapsed: PropTypes.func.isRequired,
  countinueCounting: PropTypes.func.isRequired,
}

WorkList.defaultProps = {
  anchorEl: null,
}

export default withStyles(styles)(WorkList)
