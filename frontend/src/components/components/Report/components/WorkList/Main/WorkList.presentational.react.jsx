// modules
import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import TagShape from '../../../../../../helper/components/TagShapeForReport/TagShapeForReport.presentational.react'
import Popover from '../components/Popover.presentational.react'
// css
import scssClasses from './WorkList.scss'
import styles from '../../../../../../helper/components/Button/Button.style'


class WorkList extends React.Component {
  constructor(props) {
    super(props)
    this.handleOpenPopover = this._handleOpenPopover.bind(this)
    this.handleClose = this._handleClose.bind(this)
    this.handleYep = this._handleYep.bind(this)
    this.handleNop = this._handleNop.bind(this)
    this.state = {
      anchorEl: null,
    }
  }

  _handleOpenPopover() {
    const { changePopoverId, log: { _id } } = this.props
    this.setState({ anchorEl: findDOMNode(this.button) })
    changePopoverId(_id)
  }

  _handleClose() {
    this.props.changePopoverId('')
  }

  _handleYep() {
    const { changePopoverId, deleteLog } = this.props
    changePopoverId('')
    snackbarMessage({ message: 'Deleted successfully !' })
    deleteLog()
  }

  _handleNop() {
    this.props.changePopoverId('')
  }

  render() {
    const {
      classes, userId, selectedUser, log: { _id, title, tags, times }, workDuration, popoverId,
    } = this.props
    const len = times.length

    return (
      <div>
        <List disablePadding>
          <div className={scssClasses.text}>
            <div>
              <Typography type="subheading">
                { title }
              </Typography>
            </div>
            <div>
              <Typography type="body2" align="right">
                {len && times[len - 1].end === 'running' ? 'Running...' : workDuration}
              </Typography>
            </div>
          </div>
          <div className={scssClasses.tags}>
            {tags.map((tag, index) => (
              <TagShape
                key={index}
                tag={tag}
              />))}
          </div>
          {
            selectedUser === userId ?
              <div className={scssClasses.button}>
                <Button
                  ref={(node) => {
                    this.button = node
                  }}
                  raised
                  onClick={this.handleOpenPopover}
                  classes={{ raised: classes.WorkList }}
                >
                  Delete
                </Button>
                <Popover
                  popoverIsOpen={_id === popoverId}
                  anchorEl={this.state.anchorEl}
                  onClose={this.handleClose}
                  onYep={this.handleYep}
                  onNop={this.handleNop}
                />
              </div> : null
          }
        </List>
        <Divider light />
      </div>
    )
  }
}

WorkList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  log: PropTypes.shape({
    _id: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    times: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  userId: PropTypes.string.isRequired,
  selectedUser: PropTypes.string.isRequired,
  workDuration: PropTypes.string.isRequired,
  popoverId: PropTypes.string.isRequired,
  deleteLog: PropTypes.func.isRequired,
  changePopoverId: PropTypes.func.isRequired,
}

export default withStyles(styles)(WorkList)
