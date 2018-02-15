// modules
import { connect } from 'react-redux'
// components
import EndTimePicker from './EndTimePicker.presentational.react'
// views
import { endTimeView } from '../../../../Main/Add.reducer'
// actions
import { dispatchChangeEndTime } from '../../../../Main/Add.action'


const mapStateToProps = () => ({ endTime: endTimeView() })

const mapDispatchToProps = () =>
  ({ onEndTimeChange: ({ target: { value } }) => dispatchChangeEndTime(value) })


export default connect(mapStateToProps, mapDispatchToProps)(EndTimePicker)
