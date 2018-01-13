// modules
import { connect } from 'react-redux'
// components
import EndDatePicker from './EndDatePicker.presentational.react'
// actions
import { changeEndDate } from '../../../../Main/Report.action'


const mapStateToProps = state => ({
  endDate: state.Report.endDate,
})

const mapDispatchToProps = dispatch => ({
  onEndDateChange: e => dispatch(changeEndDate(e.target.value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(EndDatePicker)
