// modules
import { connect } from 'react-redux'
// components
import EndTimePicker from './EndTimePicker.presentational.react'
// actions
import { dispatchChangeEndTime } from '../../../../Main/Add.action'


const mapStateToProps = state => ({
  endTime: state.Add.endTime,
})

const mapDispatchToProps = () =>
  ({ onEndTimeChange: ({ target: { value } }) => dispatchChangeEndTime(value) })


export default connect(mapStateToProps, mapDispatchToProps)(EndTimePicker)
