// modules
import { connect } from 'react-redux'
// components
import WorkList from './WorkList.presentational.react'
// actions
import { deleteLog } from '../../../../../Main/App.action'
import { changeSnackbarStage } from '../../../../Snackbar/Snackbar.action'
// selectors
import { getWorksDuration } from '../../../../common/Common.selector'
// helpers
import { getLogDuration } from '../../../../common/Common.helper'


const mapStateToProps = (state, ownProps) => ({
  workDuration: getLogDuration(getWorksDuration(state), ownProps.log._id),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteLog: () => dispatch(deleteLog(ownProps.log._id)),
  changeSnackbarStage: (value, message) => dispatch(changeSnackbarStage(value, message)),
})


export default connect(mapStateToProps, mapDispatchToProps)(WorkList)
