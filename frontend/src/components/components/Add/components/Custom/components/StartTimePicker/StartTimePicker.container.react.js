// modules
import { connect } from 'react-redux'
// components
import StartTimePicker from './StartTimePicker.presentational.react'
// actions
import { dispatchChangeStartTime } from '../../../../Main/Add.action'


const mapStateToProps = state => ({ startTime: state.Add.startTime })

const mapDispatchToProps = () =>
  ({ onStartTimeChange: ({ target: { value } }) => dispatchChangeStartTime(value) })


export default connect(mapStateToProps, mapDispatchToProps)(StartTimePicker)
