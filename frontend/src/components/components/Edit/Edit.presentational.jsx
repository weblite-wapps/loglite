import React from 'react'
import PropTypes from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import List from '@material-ui/core/List'
import Picker from '../../../helper/components/Picker/Picker.presentational'
import { Divider } from '@material-ui/core'
class Edit extends React.Component {
  render() {
    const { submit, log } = this.props
    return (
      <div>
        <Modal open>
          <div>
            <ul>
              {log.times.map(item => (
                <List className="todayWork-list" key={item.start + item.end}>
                  <Picker label="Date" type="Date" />
                  <Picker label="Start time" type="Time" />
                  <Picker label="End time" type="Time" />
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
}

export default Edit
