import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'

class AppSnackbar extends React.Component {
  constructor(props) {
    super(props)
    this.handleClose = this._handleClose.bind(this)
  }

  _handleClose() {
    this.props.changeSnackbarStage(false, '')
  }

  render() {
    const { message, snackbarIsOpen } = this.props
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={snackbarIsOpen}
        autoHideDuration={3000}
        onClose={this.handleClose}
        message={<span id="message-id">{message}</span>}
      />
    )
  }
}

AppSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  snackbarIsOpen: PropTypes.bool.isRequired,
  changeSnackbarStage: PropTypes.func.isRequired,
}

export default AppSnackbar
