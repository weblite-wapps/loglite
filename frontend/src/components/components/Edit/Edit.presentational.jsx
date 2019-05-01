import React from 'react'
import PropTypes, { shape } from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import List from '@material-ui/core/List'
import Picker from '../../../helper/components/Picker/Picker.presentational'
import { logView, timesView } from './Edit.reducer'
import { Divider } from '@material-ui/core'
class Edit extends React.Component {
  render() {
    const { submit, times, onStartTimeChange, onEndTimeChange } = this.props
    return (
      <div>
        <Modal open>
          <div style={{ backgroundColor: 'white' }}>
            <ul>
              {times.map((item, index) => (
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
            <button
              onClick={() => submit({ times: timesView(), log: logView() })}
            >
              Submit
            </button>
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
  times: PropTypes.arrayOf(shape({})).isRequired,
  isError: PropTypes.shape({}).isRequired,
}

export default Edit
