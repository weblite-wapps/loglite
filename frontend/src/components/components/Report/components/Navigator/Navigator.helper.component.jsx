// modules
import React from 'react'
import PropTypes from 'prop-types'
import MuiButton from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip' 
// icons
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
// helpers
import { formattedDate } from '../../../../../helper/functions/date.helper'
import { getNow } from '../../../../../helper/functions/time.helper'
// styles
import './Navigator.scss'

export const Button = ({
  classes,
  isActive,
  currentPage,
  onPreviousClick,
  onNextClick,
  direction,
}) => (
  <Tooltip
    title={direction === 'Back' ? 'previous day' : 'next day'}
    placement="bottom"
    enterDelay={150}
    leaveDelay={150}
  >
    <div>
      <MuiButton
        disabled={
          direction === 'Back'
            ? !isActive
            : !isActive || formattedDate(currentPage) === formattedDate(getNow())
        }
        onClick={direction === 'Back' ? onPreviousClick : onNextClick}
        classes={{ root: classes.root, disabled: classes.disabled }}
      >
        {direction === 'Back' && <KeyboardArrowLeft />}
        {direction === 'Next' && <KeyboardArrowRight />}
      </MuiButton>
    </div>
  </Tooltip>
)

Button.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isActive: PropTypes.bool.isRequired,
  currentPage: PropTypes.instanceOf(Date).isRequired,
  direction: PropTypes.string.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
}

export const Text = ({ isActive, expandMode, currentPage }) => (
  <Typography variant="body2" align="center" className="navigator-textSlider">
    {!isActive ? expandMode : formattedDate(currentPage)}
  </Typography>
)

Text.propTypes = {
  isActive: PropTypes.bool.isRequired,
  expandMode: PropTypes.string.isRequired,
  currentPage: PropTypes.instanceOf(Date).isRequired,
}
