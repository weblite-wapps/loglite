// modules
import { connect } from 'react-redux'
// components
import Summary from './Summary.presentational.react'
// views
import { textSliderView } from '../../Main/Home.reducer'
// actions
import { dispatchChangeTextSlider } from '../../Main/Home.action'


const mapStateToProps = () => ({
  textSlider: textSliderView(),
})

const mapDispatchToProps = () => ({ changeTextSlider: dispatchChangeTextSlider })


export default connect(mapStateToProps, mapDispatchToProps)(Summary)
