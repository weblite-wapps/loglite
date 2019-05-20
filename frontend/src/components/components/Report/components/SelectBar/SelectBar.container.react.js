// modules
import { connect } from 'react-redux'
// components
import SelectBar from './SelectBar.presentational'
// views
import { selectedUserView } from '../../Main/Report.reducer'
import { creatorView, usersView } from '../../../../Main/App.reducer'
// actions
import { dispatchChangeSelectedUser } from '../../Main/Report.action'

const mapStateToProps = () => ({
  creator: creatorView(),
  users: usersView(),
  selectedUser: selectedUserView(),
})

const mapDispatchToProps = () => ({
  changeSelectedUser: dispatchChangeSelectedUser,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectBar)
