// modules
import { connect } from 'react-redux'
// components
import StartDatePicker from './StartDatePicker.presentational.react'
// views
import { startDateView } from '../../../Main/Report.reducer'
// actions
import { dispatchChangeStartDate } from '../../../Main/Report.action'


const mapStateToProps = () => ({ startDate: startDateView() })

const mapDispatchToProps = () =>
  ({ onStartDateChange: ({ target: { value } }) => dispatchChangeStartDate(value) })


export default connect(mapStateToProps, mapDispatchToProps)(StartDatePicker)
