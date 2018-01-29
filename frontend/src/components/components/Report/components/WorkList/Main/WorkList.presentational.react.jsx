// modules
import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import * as R from 'ramda'
import { MuiThemeProvider } from 'material-ui/styles'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import Popover from 'material-ui/Popover'
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import TagShape from '../../../../../../helper/components/TagShapeForReport/TagShapeForReport.presentational.react'
// css
import scssClasses from './WorkList.scss'
import theme from './WorkList.helper'


export default class WorkList extends React.Component {
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
    this.setState({ anchorEl: findDOMNode(this.button) })
    this.props.changePopoverStage(true)
  }

  _handleClose() {
    this.props.changePopoverStage(false)
  }

  _handleYep() {
    this.props.changePopoverStage(false)
    snackbarMessage({ message: 'Deleted successfully !' })
    this.props.deleteLog()
  }

  _handleNop() {
    this.props.changePopoverStage(false)
  }

  render() {
    const { userId, selectedUser, log, workDuration } = this.props
    return (
      <div>
        <List disablePadding>
          <div className={scssClasses.text}>
            <div>
              <Typography type="subheading">
                { log.title }
              </Typography>
            </div>
            <div>
              <Typography type="body2" align="right">
                {R.test(/^NaN/, workDuration) ? 'Running...' : workDuration}
              </Typography>
            </div>
          </div>
          <div className={scssClasses.tags}>
            {log.tags.map((tag, index) => (
              <TagShape
                key={index}
                tag={tag}
              />))}
          </div>
          {
            selectedUser === userId ?
              <div className={scssClasses.button}>
                <MuiThemeProvider theme={theme}>
                  <Button
                    ref={(node) => {
                      this.button = node
                    }}
                    raised
                    onClick={this.handleOpenPopover}
                  >
                    Delete
                  </Button>
                  <Popover
                    open={log.popoverIsOpen}
                    onClose={this.handleClose}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Typography type="subheading" style={{ margin: '5px' }}>
                      Are you sure?
                    </Typography>
                    <Button raised onClick={this.handleYep}>Yep</Button>
                    <Button raised onClick={this.handleNop}>Nop</Button>
                  </Popover>
                </MuiThemeProvider>
              </div> : null
          }
        </List>
        <Divider />
      </div>
    )
  }
}

WorkList.propTypes = {
  log: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ])).isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  selectedUser: PropTypes.string.isRequired,
  workDuration: PropTypes.string.isRequired,
  deleteLog: PropTypes.func.isRequired,
  changePopoverStage: PropTypes.func.isRequired,
}
