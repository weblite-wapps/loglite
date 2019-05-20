// modules
import { connect } from 'react-redux'
// components
import Summary from './Summary.presentational'
// views
import { textSliderView } from '../../Main/Home.reducer'
// actions
import { dispatchChangeTextSlider } from '../../Main/Home.action'

const mapStateToProps = () => ({
  name: textSliderView().name,
  duration: textSliderView().duration,
})

const mapDispatchToProps = () => ({
  changeTextSlider: dispatchChangeTextSlider,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Summary)
