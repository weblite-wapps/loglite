import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'
import Slide from 'material-ui/transitions/Slide'


function TransitionLeft(props) {
  return <Slide direction="left" {...props} />
}

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
        transition={TransitionLeft}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
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
