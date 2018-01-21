// modules
import { connect } from 'react-redux'
// components
import WorkList from './WorkList.presentational.react'
// actions
import { deleteLog, changePopoverStage } from '../../../../../Main/App.action'
// selectors
import { getWorksDuration } from '../../../../common/Common.selector'
// helpers
import { getLogDuration } from '../../../../common/Common.helper'


const mapStateToProps = (state, ownProps) => ({
  workDuration: getLogDuration(getWorksDuration(state), ownProps.log._id),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteLog: () => dispatch(deleteLog(ownProps.log._id)),
  changePopoverStage: value => dispatch(changePopoverStage(ownProps.log._id, value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(WorkList)
