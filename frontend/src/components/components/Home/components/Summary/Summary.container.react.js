// modules
import { connect } from 'react-redux'
// components
import Summary from './Summary.presentational.react'
// actions
import { changeTextSlider } from '../../Main/Home.action'


const mapStateToProps = state => ({
  textSlider: state.Home.textSlider,
})

const mapDispatchToProps = dispatch => ({
  changeTextSlider: value => dispatch(changeTextSlider(value)),

})


export default connect(mapStateToProps, mapDispatchToProps)(Summary)
