// modules
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
import MuiAppBar from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/core/styles'
// icons
import CancelIcon from '@material-ui/icons/Cancel'
import CloseButton from '@material-ui/icons/Close'
import Done from '@material-ui/icons/Done'
// components
import Popover from '../../../../helper/components/Popover/Popover.presentational'
import { TagPanel } from '../../../../helper/functions/common.helper.component'

// helpers
import Picker from '../../../../helper/components/Picker/Picker.presentational'
import TextField from '../../../../helper/components/TextField/TextField.presentational'
// classes
import './Edit.scss'
import { default as style } from './Edit.style'

export const Transition = props => <Slide direction="up" {...props} />

const AppBar = ({ close, submit, classes, isLoading }) => (
  <MuiAppBar style={{ position: 'fixed' }}>
    <Toolbar>
      <IconButton disabled={isLoading} className="icon" onClick={close}>
        <CloseButton classes={{ root: classes.svgIcon }} />
      </IconButton>
      <strong>Edit Log</strong>
      <IconButton disabled={isLoading} className="icon" onClick={submit}>
        <Done classes={{ root: classes.svgIcon }} />
      </IconButton>
    </Toolbar>
  </MuiAppBar>
)

AppBar.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export const AppBarWithStyle = withStyles(style)(AppBar)

export const Content = ({
  title,
  onTitleChange,
  times,
  isError,
  ...others
}) => (
  <div className="intervalList">
    <div className="title-panel">
      <TextField
        label="Title"
        value={title}
        onChange={onTitleChange}
        isError={isError && isError.title}
      />
    </div>

    <TagPanel {...others} />
    <List>
      {times.map((time, index) => (
        <IntervalItem {...others} index={index} time={time} key={time._id} />
      ))}
    </List>
  </div>
)

Content.propTypes = {
  times: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  isError: PropTypes.shape({}).isRequired,
}

export const ContentWithStyle = withStyles(style)(Content)

class IntervalItem extends Component {
  constructor(props) {
    super(props)
    this.handleOpenPopOver = this._handleOpenPopOver.bind(this)
  }

  _handleOpenPopOver(id) {
    const { changeAnchorEl, changePopoverId } = this.props
    changeAnchorEl(findDOMNode(this.iconButton))
    changePopoverId(id)
  }

  render() {
    const {
      time: { _id, start, end },
      index,
      onStartTimeChange,
      onEndTimeChange,
      classes,
      removeInterval,
      anchorEl,
      popoverId,
    } = this.props

    return (
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
          {end !== 'running' && (
            <>
              <IconButton
                ref={node => {
                  this.iconButton = node
                }}
                onClick={() => this.handleOpenPopOver(_id)}
              >
                <CancelIcon classes={{ root: classes.deletePanel }} />
              </IconButton>
              <Popover
                popoverIsOpen={popoverId === _id}
                anchorEl={anchorEl}
                anchorReference="anchorEl"
                onClose={this.handleOpenPopOver}
                onYep={() => removeInterval(_id)}
                onNop={this.handleOpenPopOver}
              />
            </>
          )}
        </div>
      </ListItem>
    )
  }
}

IntervalItem.propTypes = {
  onStartTimeChange: PropTypes.func.isRequired,
  onEndTimeChange: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  removeInterval: PropTypes.func.isRequired,
}
