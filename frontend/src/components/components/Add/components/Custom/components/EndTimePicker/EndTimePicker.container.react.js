// modules
import { connect } from 'react-redux'
// components
import EndTimePicker from './EndTimePicker.presentational.react'
// actions
import { changeEndTime } from '../../../../Main/Add.action'


const mapStateToProps = state => ({
  endTime: state.Add.endTime,
})

const mapDispatchToProps = dispatch => ({
  onEndTimeChange: e => dispatch(changeEndTime(e.target.value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(EndTimePicker)
