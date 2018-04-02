// modules
import React from 'react'
import PropTypes from 'prop-types'
import MuiButton from 'material-ui/Button'
import Typography from 'material-ui/Typography'
// icons
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
// helpers
import { formattedDate } from '../../../../../helper/functions/date.helper'
// styles
import scssClasses from './Navigator.scss'


export const Button = ({
  classes, isCustom, currentPage, onPreviousClick, onNextClick, direction,
}) => (
  <MuiButton
    disabled={direction === 'Back' ? isCustom :
      isCustom || formattedDate(currentPage) === formattedDate(new Date())}
    onClick={direction === 'Back' ? onPreviousClick : onNextClick}
    classes={{ root: classes.root, disabled: classes.disabled }}
  >
    {direction === 'Back' && <KeyboardArrowLeft />}
    {direction === 'Next' && <KeyboardArrowRight />}
  </MuiButton>
)

Button.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isCustom: PropTypes.bool.isRequired,
  currentPage: PropTypes.instanceOf(Date).isRequired,
  direction: PropTypes.string.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
}


export const Text = ({ isCustom, currentPage }) => (
  <Typography type="body1" align="center" className={scssClasses.textSlider}>
    {isCustom ? 'CUSTOMIZED' : formattedDate(currentPage)}
  </Typography>
)

Text.propTypes = {
  isCustom: PropTypes.bool.isRequired,
  currentPage: PropTypes.instanceOf(Date).isRequired,
}
