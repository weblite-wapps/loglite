// modules
import { connect } from 'react-redux'
// components
import Summary from './Summary.presentational'
// views
import { textSliderView } from '../../Main/Home.reducer'
// actions
import { dispatchChangeTextSlider } from '../../Main/Home.action'
// selectors
import { getTotalDuration } from './Summary.selector'

const mapStateToProps = (state) => ({
  name: textSliderView().name,
  duration: getTotalDuration(state),
})

const mapDispatchToProps = () => ({
  changeTextSlider: dispatchChangeTextSlider,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Summary)
