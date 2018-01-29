// modules
import { connect } from 'react-redux'
// components
import Summary from './Summary.presentational.react'
// actions
import { dispatchChangeTextSlider } from '../../Main/Home.action'


const mapStateToProps = state => ({
  textSlider: state.Home.textSlider,
})

const mapDispatchToProps = () => ({ changeTextSlider: dispatchChangeTextSlider })


export default connect(mapStateToProps, mapDispatchToProps)(Summary)
