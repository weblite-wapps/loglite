import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import MuiButton from 'material-ui/Button'
import format from 'date-fns/format'
// icons
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
// scssClasses
import scssClasses from './Navigator.scss'

export default function Navigator(props) {
  const { isCustom, currentPage, onPreviousClick, onNextClick } = props
  return (
    <div className={scssClasses.navigator}>
      <MuiButton onClick={onPreviousClick} disabled={isCustom}>
        <KeyboardArrowLeft />
      </MuiButton>
      <Typography type="body1" align="center" className={scssClasses.textSlider}>
        {isCustom ? 'CUSTOMIZED' : format(currentPage, 'YYYY-MM-DD')}
      </Typography>
      <MuiButton
        disabled={isCustom || format(currentPage, 'YYYY-MM-DD') === format(new Date(), 'YYYY-MM-DD')}
        onClick={onNextClick}
      >
        <KeyboardArrowRight />
      </MuiButton>
    </div>
  )
}

Navigator.propTypes = {
  isCustom: PropTypes.bool.isRequired,
  currentPage: PropTypes.instanceOf(Date).isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
}
