import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
// cores
import Slide from '@material-ui/core/Slide'
import { default as MuiAppBar } from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Done from '@material-ui/icons/Done'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import { ListItem } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
// icons
import CancelIcon from '@material-ui/icons/Cancel'
import CloseButton from '@material-ui/icons/Close'
// helpers
import Picker from '../../../helper/components/Picker/Picker.presentational'
// classes
import './Edit.scss'
import { default as style } from './Edit.style'

export function Transition(props) {
  return <Slide direction="up" {...props} />
}

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

const Content = ({
  title,
  onTitleChange,
  times,
  onStartTimeChange,
  onEndTimeChange,
  classes,
  isError,
}) => (
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
      {times.map((item, index) => (
        <ListItem className="todayWorklist" key={item._id}>
          <div className="interval-panel">
            <Typography className="interval">INTERVAL</Typography>
            <Typography className="counter">{index + 1}</Typography>
          </div>
          <Picker
            value={item.start}
            onChange={e => onStartTimeChange(e, item._id)}
            label="Start time"
            type="time"
            isError={false}
            classes={{ container: classes.textField }}
          />
          <Picker
            value={R.toUpper(R.head(item.end)) + R.tail(item.end)}
            onChange={e =>
              item.end !== 'running' && onEndTimeChange(e, item._id)
            }
            label="End time"
            type={item.end === 'running' ? 'text' : 'time'}
            isError={false}
            classes={{ container: classes.textField }}
          />
          <div className="deletePanel">
            <Tooltip
              title="Coming Soon :)"
              placement="right"
              enterDelay={50}
              leaveDelay={150}
            >
              <IconButton>
                <CancelIcon classes={{ root: classes.deletePanel }} />
              </IconButton>
            </Tooltip>
          </div>
        </ListItem>
      ))}
    </List>
  </div>
)

Content.propTypes = {
  onStartTimeChange: PropTypes.func.isRequired,
  onEndTimeChange: PropTypes.func.isRequired,
  times: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.shape({}).isRequired,
}

export const ContentWithStyle = withStyles(style)(Content)
