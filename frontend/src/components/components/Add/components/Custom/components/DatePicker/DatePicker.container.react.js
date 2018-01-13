// modules
import { connect } from 'react-redux'
// components
import DatePicker from './DatePicker.presentational.react'
// actions
import { changeDate } from '../../../../Main/Add.action'


const mapStateToProps = state => ({
  date: state.Add.date,
})

const mapDispatchToProps = dispatch => ({
  onDateChange: e => dispatch(changeDate(e.target.value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(DatePicker)
