// modules
import { connect } from 'react-redux'
// components
import DatePicker from './DatePicker.presentational.react'
// actions
import { dispatchChangeDate } from '../../../../Main/Add.action'


const mapStateToProps = state => ({
  date: state.Add.date,
})

const mapDispatchToProps = () =>
  ({ onDateChange: ({ target: { value } }) => dispatchChangeDate(value) })


export default connect(mapStateToProps, mapDispatchToProps)(DatePicker)
