// modules
import { connect } from 'react-redux'
// components
import StartDatePicker from './StartDatePicker.presentational.react'
// actions
import { dispatchChangeStartDate } from '../../../Main/Report.action'


const mapStateToProps = state => ({
  startDate: state.Report.startDate,
})

const mapDispatchToProps = () =>
  ({ onEndDateChange: ({ target: { value } }) => dispatchChangeStartDate(value) })


export default connect(mapStateToProps, mapDispatchToProps)(StartDatePicker)
