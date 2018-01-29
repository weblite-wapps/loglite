// modules
import { connect } from 'react-redux'
// components
import EndDatePicker from './EndDatePicker.presentational.react'
// actions
import { dispatchChangeEndDate } from '../../../Main/Report.action'


const mapStateToProps = state => ({ endDate: state.Report.endDate })

const mapDispatchToProps = () =>
  ({ onEndDateChange: ({ target: { value } }) => dispatchChangeEndDate(value) })


export default connect(mapStateToProps, mapDispatchToProps)(EndDatePicker)
