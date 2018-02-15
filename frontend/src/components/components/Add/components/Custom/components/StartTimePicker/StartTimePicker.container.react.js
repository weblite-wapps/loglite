// modules
import { connect } from 'react-redux'
// components
import StartTimePicker from './StartTimePicker.presentational.react'
// views
import { startTimeView } from '../../../../Main/Add.reducer'
// actions
import { dispatchChangeStartTime } from '../../../../Main/Add.action'


const mapStateToProps = () => ({ startTime: startTimeView() })

const mapDispatchToProps = () =>
  ({ onStartTimeChange: ({ target: { value } }) => dispatchChangeStartTime(value) })


export default connect(mapStateToProps, mapDispatchToProps)(StartTimePicker)
