// modules
import { connect } from 'react-redux'
// components
import SelectBar from './SelectBar.presentational.react'
// actions
import { changeSelectedUser } from '../../../Main/Report.action'


const mapStateToProps = state => ({
  creator: state.App.creator,
  users: state.App.users,
  selectedUser: state.Report.selectedUser,
})

const mapDispatchToProps = dispatch => ({
  changeSelectedUser: user => dispatch(changeSelectedUser(user)),
})


export default connect(mapStateToProps, mapDispatchToProps)(SelectBar)
