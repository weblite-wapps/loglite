// modules
import { connect } from 'react-redux'
// components
import StartDatePicker from './StartDatePicker.presentational.react'
// actions
import { changeStartDate } from '../../../../Main/Report.action'


const mapStateToProps = state => ({
  startDate: state.Report.startDate,
})

const mapDispatchToProps = dispatch => ({
  onStartDateChange: e => dispatch(changeStartDate(e.target.value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(StartDatePicker)
