// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
// components
import Button from '../../../../../helper/components/Button/Button.presentational'
// helpers
// style
import scssClasses from './Summary.scss'


const IconButton = ({ name, direction, changeTextSlider, classes }) => (
  <Button
    disabled={(direction === 'Back') ? name === 'Today' : name === 'This Month'}
    onClick={() => changeTextSlider(direction)}
    componentName="Summary"
  >
    {
      (direction === 'Back') ?
        <KeyboardArrowLeft classes={{ root: classes.svgIcon }} /> :
        <KeyboardArrowRight classes={{ root: classes.svgIcon }} />
    }
  </Button>
)

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  changeTextSlider: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
}


export const DurationPanel = props => (
  <div className={scssClasses.textSlider}>
    <IconButton {...props} direction="Back" />
    <Typography type="headline"> { props.name } </Typography>
    <IconButton {...props} direction="Next" />
  </div>
)

DurationPanel.propTypes = {
  name: PropTypes.string.isRequired,
}


export const SliderText = ({ text, type }) => (
  <div className={scssClasses.textSlider}>
    <Typography type={type}>
      { text }
    </Typography>
  </div>
)

SliderText.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}
