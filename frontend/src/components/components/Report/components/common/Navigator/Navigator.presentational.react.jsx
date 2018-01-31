import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import MuiButton from 'material-ui/Button'
import format from 'date-fns/format'
// icons
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
// scssClasses
import scssClasses from './Navigator.scss'

const styles = () => ({
  root: {
    background: '#505050',
    color: 'white',
    minHeight: '35px',
    minWidth: '35px',
    padding: '0px',
    borderRadius: '0px',
    margin: '0px',
    border: '0.5px solid white',
  },
  disabled: {
    color: '#919191',
  },
})


function Navigator(props) {
  const { classes, isCustom, currentPage, onPreviousClick, onNextClick } = props

  return (
    <div className={scssClasses.navigator}>
      <MuiButton
        onClick={onPreviousClick}
        disabled={isCustom}
        classes={{ root: classes.root, disabled: classes.disabled }}
      >
        <KeyboardArrowLeft />
      </MuiButton>
      <Typography type="body1" align="center" className={scssClasses.textSlider}>
        {isCustom ? 'CUSTOMIZED' : format(currentPage, 'YYYY-MM-DD')}
      </Typography>
      <MuiButton
        disabled={isCustom || format(currentPage, 'YYYY-MM-DD') === format(new Date(), 'YYYY-MM-DD')}
        onClick={onNextClick}
        classes={{ root: classes.root, disabled: classes.disabled }}
      >
        <KeyboardArrowRight />
      </MuiButton>
    </div>
  )
}

Navigator.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isCustom: PropTypes.bool.isRequired,
  currentPage: PropTypes.instanceOf(Date).isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(Navigator)
