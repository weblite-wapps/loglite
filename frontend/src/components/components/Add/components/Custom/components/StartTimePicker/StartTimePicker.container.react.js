// modules
import { connect } from 'react-redux'
// components
import StartTimePicker from './StartTimePicker.presentational.react'
// actions
import { changeStartTime } from '../../../../Main/Add.action'


const mapStateToProps = state => ({
  startTime: state.Add.startTime,
})

const mapDispatchToProps = dispatch => ({
  onStartTimeChange: e => dispatch(changeStartTime(e.target.value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(StartTimePicker)
