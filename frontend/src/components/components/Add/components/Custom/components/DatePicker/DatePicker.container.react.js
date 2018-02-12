// modules
import { connect } from 'react-redux'
// components
import DatePicker from './DatePicker.presentational.react'
import { dateView } from '../../../../Main/Add.reducer'
// actions
import { dispatchChangeDate } from '../../../../Main/Add.action'


const mapStateToProps = () => ({ date: dateView() })

const mapDispatchToProps = () =>
  ({ onDateChange: ({ target: { value } }) => dispatchChangeDate(value) })


export default connect(mapStateToProps, mapDispatchToProps)(DatePicker)
