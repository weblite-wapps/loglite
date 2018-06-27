// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// helpers
import { SliderText, DurationPanel } from './Summary.helper.component'
// styles
import scssClasses from './Summary.scss'
import styles from './Summary.style'

const Summary = props => (
  <div className={scssClasses.container}>
    <SliderText text="You worked" variant="display1" />
    <SliderText text={props.duration} variant="display2" />
    <DurationPanel {...props} />
  </div>
)

Summary.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  changeTextSlider: PropTypes.func.isRequired,
}

export default withStyles(styles)(Summary)
