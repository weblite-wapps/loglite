import React from 'react'
import PropTypes from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import List from '@material-ui/core/List'
import Picker from '../../../helper/components/Picker/Picker.presentational'
import { Divider } from '@material-ui/core'
import { getCurrentTime } from '../../../helper/functions/time.helper'
class Edit extends React.Component {
  render() {
    const { submit, log, onStartTimeChange, onEndTimeChange } = this.props
    console.log(log.times)
    return (
      <div>
        <Modal open>
          <div style={{ backgroundColor: 'white' }}>
            <ul>
              {log.times.map(item => (
                <List className="todayWork-list" key={item.start + item.end}>
                  <Picker
                    value={item.start}
                    onChange={e => onStartTimeChange(e, item._id)}
                    label="Start time"
                    type="Time"
                  />
                  <Picker
                    value={item.end}
                    onChange={e => onEndTimeChange(e, item._id)}
                    label="End time"
                    type="Time"
                  />
                  <li>{item.start}</li>
                  <li>{item.end}</li>
                  <Divider />
                </List>
              ))}
            </ul>
            <button onClick={submit}>Submit</button>
          </div>
        </Modal>
      </div>
    )
  }
}

Edit.propTypes = {
  submit: PropTypes.func.isRequired,
  log: PropTypes.shape({}).isRequired,
  onStartTimeChange: PropTypes.func.isRequired,
  onEndTimeChange: PropTypes.func.isRequired,
}

export default Edit
