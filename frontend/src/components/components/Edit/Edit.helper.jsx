import * as R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
// cores
import Slide from '@material-ui/core/Slide'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import MuiAppBar from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/core/styles'
// icons
import CancelIcon from '@material-ui/icons/Cancel'
import CloseButton from '@material-ui/icons/Close'
import Done from '@material-ui/icons/Done'
// helpers
import Picker from '../../../helper/components/Picker/Picker.presentational'
// classes
import './Edit.scss'
import { default as style } from './Edit.style'
import Popover from './component/Popover'

export const Transition = props => <Slide direction="up" {...props} />

const AppBar = ({ close, submit, classes }) => (
  <MuiAppBar style={{ position: 'fixed' }}>
    <Toolbar>
      <IconButton className="icon" onClick={close}>
        <CloseButton classes={{ root: classes.svgIcon }} />
      </IconButton>
      <strong>Edit Log</strong>
      <IconButton className="icon" onClick={submit}>
        <Done classes={{ root: classes.svgIcon }} />
      </IconButton>
    </Toolbar>
  </MuiAppBar>
)

AppBar.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
}

export const AppBarWithStyle = withStyles(style)(AppBar)

class Content extends Component {
  constructor(props) {
    super(props)
    this.handleOpenPopOver = this.handleOpenPopOver.bind(this)
  }
  handleOpenPopOver(id) {
    const { changeAnchorEl, changePopoverId } = this.props
    changeAnchorEl(findDOMNode(this.iconButton))
    console.log(this.iconButton)
    changePopoverId(id)
  }

  handleClosePopOver() {
    const { changeAnchorEl, changePopoverId } = this.props
    changeAnchorEl(null)
    changePopoverId('')
  }
  render() {
    const {
      title,
      onTitleChange,
      times,
      onStartTimeChange,
      onEndTimeChange,
      classes,
      isError,
      removeInterval,
      anchorEl,
      popoverId,
    } = this.props
    return (
      <div className="intervalList">
        <List>
          <Picker
            value={title}
            onChange={onTitleChange}
            placeholder="Title goes here ..."
            type="text"
            label="Title"
            isError={isError && isError.title}
          />
          {times.map(({ _id, start, end }, index) => (
            <ListItem className="todayWorklist" key={_id}>
              <div className="interval-panel">
                <Typography className="interval">INTERVAL</Typography>
                <Typography className="counter">{index + 1}</Typography>
              </div>
              <Picker
                value={start}
                onChange={e => onStartTimeChange(e, _id)}
                label="Start time"
                type="time"
                isError={false}
                classes={{ container: classes.textField }}
              />
              <Picker
                value={R.toUpper(R.head(end)) + R.tail(end)}
                onChange={e => end !== 'running' && onEndTimeChange(e, _id)}
                label="End time"
                type={end === 'running' ? 'text' : 'time'}
                isError={false}
                classes={{ container: classes.textField }}
              />
              <div className="deletePanel">
                <IconButton
                  ref={node => {
                    // if (popoverId === _id) {
                    this.iconButton = node
                    console.log('node ', node)
                    // }
                  }}
                  onClick={() => this.handleOpenPopOver(_id)}
                >
                  <CancelIcon classes={{ root: classes.deletePanel }} />
                </IconButton>
              </div>
              <Popover
                popoverIsOpen={popoverId === _id}
                anchorEl={anchorEl}
                anchorReference="anchorEl"
                onClose={this.handleOpenPopOver}
                onYep={() => removeInterval(_id)}
                onNop={this.handleOpenPopOver}
              />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}
Content.propTypes = {
  onStartTimeChange: PropTypes.func.isRequired,
  onEndTimeChange: PropTypes.func.isRequired,
  times: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.shape({}).isRequired,
  removeInterval: PropTypes.func.isRequired,
}

export const ContentWithStyle = withStyles(style)(Content)
