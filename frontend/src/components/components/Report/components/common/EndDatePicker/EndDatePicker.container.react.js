// modules
import { connect } from 'react-redux'
// components
import EndDatePicker from './EndDatePicker.presentational.react'
// views
import { endDateView } from '../../../Main/Report.reducer'
// actions
import { dispatchChangeEndDate } from '../../../Main/Report.action'


const mapStateToProps = () => ({ endDate: endDateView() })

const mapDispatchToProps = () =>
  ({ onEndDateChange: ({ target: { value } }) => dispatchChangeEndDate(value) })


export default connect(mapStateToProps, mapDispatchToProps)(EndDatePicker)
