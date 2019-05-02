import React from 'react'
import PropTypes, { shape } from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import Picker from '../../../helper/components/Picker/Picker.presentational'
import { Divider } from '@material-ui/core'
const Edit = ({ submit, times, onStartTimeChange, onEndTimeChange, close }) => (
  <div>
    <Dialog open fullScreen>
      <div style={{ backgroundColor: 'white' }}>
        <ul>
          {times.map(item => (
            <List className="todayWork-list" key={item._id}>
              <Picker
                value={item.start}
                onChange={e => onStartTimeChange(e, item._id)}
                label="Start time"
                type="time"
              />
              <Picker
                value={item.end}
                onChange={e => onEndTimeChange(e, item._id)}
                label="End time"
                type="time"
              />
              <Divider />
            </List>
          ))}
        </ul>
        <button onClick={submit}>Submit</button>
        <button onClick={close}>X</button>
      </div>
    </Dialog>
  </div>
)

Edit.propTypes = {
  submit: PropTypes.func.isRequired,
  log: PropTypes.shape({}).isRequired,
  onStartTimeChange: PropTypes.func.isRequired,
  onEndTimeChange: PropTypes.func.isRequired,
  times: PropTypes.arrayOf(shape({})).isRequired,
  isError: PropTypes.shape({}).isRequired,
  close: PropTypes.func.isRequired,
}

export default Edit
