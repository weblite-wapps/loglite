import React from 'react'
import PropTypes from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

class Edit extends React.Component {
  render() {
    const { submit, log } = this.props
    return (
      <div>
        <Modal open>
          <div>
            <ul>
              {log.times.map(item => (
                <li key={item.start}>{item.start}</li>
              ))}
            </ul>
            <button onClick={() => submit({}, false)}>Submit</button>
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
