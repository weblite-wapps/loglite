// modules
import { connect } from 'react-redux'
// components
import Snackbar from './Snackbar.presentational'
// actions
import { dispatchChangeSnackbarStage } from './Snackbar.action'
//views
import { snackbarIsOpenView, messageView } from './Snackbar.reducer'
const mapStateToProps = () => ({
  snackbarIsOpen: snackbarIsOpenView(),
  message: messageView(),
})

const mapDispatchToProps = () => ({
  closeSnackbar: () => dispatchChangeSnackbarStage(''),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Snackbar)
