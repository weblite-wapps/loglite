// modules
import { connect } from 'react-redux'
// components
import Edit from './Edit.presentational'
// views
// actions
import { dispatchChangeEditMode } from '../../Main/Report.action'

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({
  submit: () => dispatchChangeEditMode(false),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit)
