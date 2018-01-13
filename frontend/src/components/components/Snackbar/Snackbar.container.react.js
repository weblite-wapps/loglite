// modules
import { connect } from 'react-redux'
// components
import Snackbar from './Snackbar.presentational.react'
// actions
import { changeSnackbarStage } from './Snackbar.action'


const mapStateToProps = state => ({
  snackbarIsOpen: state.Snackbar.snackbarIsOpen,
  message: state.Snackbar.message,
})

const mapDispatchToProps = dispatch => ({
  changeSnackbarStage: (value, message) => dispatch(changeSnackbarStage(value, message)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Snackbar)
