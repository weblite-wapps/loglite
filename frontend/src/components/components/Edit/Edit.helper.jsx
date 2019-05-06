import React from 'react'
import PropTypes from 'prop-types'

//cores
import Slide from '@material-ui/core/Slide'
import { default as MuiAppBar } from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Done from '@material-ui/icons/Done'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import { ListItem } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
//icons
import CancelIcon from '@material-ui/icons/Cancel'
import CloselButton from '@material-ui/icons/Close'
//helper
import Picker from '../../../helper/components/Picker/Picker.presentational'
//classes
import './Edit.scss'

export function Transition(props) {
  return <Slide direction="up" {...props} />
}

export const AppBar = ({ close, submit }) => (
  <MuiAppBar style={{ position: 'fixed' }}>
    <Toolbar>
      <IconButton className="icon" onClick={close}>
        <CloselButton />
      </IconButton>
      <em>
        <strong>Edit Log</strong>
      </em>
      <IconButton className="icon" onClick={submit}>
        <Done />
      </IconButton>
    </Toolbar>
  </MuiAppBar>
)

AppBar.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
}

export const Content = ({
  title,
  onTitleChange,
  times,
  onStartTimeChange,
  onEndTimeChange,
}) => (
  <div className="intervalList">
    <List>
      <Picker
        defaultValue="Datas are not imported!"
        value={title}
        onChange={onTitleChange}
        placeholder="Title goes here ..."
        type="text"
        label="Title"
        isError={false}
      />
      {times.map((item, index) => (
        <ListItem className="todayWorklist" key={item._id}>
          <div className="interval-panel">
            <Typography className="interval">INTERVAL</Typography>
            <Typography className="counter">{index + 1}</Typography>
          </div>
          <Picker
            value={item.start}
            defaultValue="00:00"
            onChange={e => onStartTimeChange(e, item._id)}
            label="Start time"
            type="time"
            isError={false}
          />
          <Picker
            defaultValue="00:00"
            value={item.end}
            onChange={e => onEndTimeChange(e, item._id)}
            label="End time"
            type="time"
            isError={false}
          />
          <div className="deletePanel">
            <Tooltip
              title="Coming Soon :)"
              placement="right"
              enterDelay={50}
              leaveDelay={150}
            >
              <IconButton>
                <CancelIcon />
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
  title: PropTypes.string,
  onTitleChange: PropTypes.func.isRequired,
}
