// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
// css
import scssClasses from './Summary.scss'
import styles from './Summary.style'


function Summary(props) {
  const { textSlider, changeTextSlider, classes } = props
  return (
    <div className={scssClasses.container}>
      <div className={scssClasses.textSlider}>
        <Typography type="display1">
          You worked
        </Typography>
      </div>
      <div className={scssClasses.textSlider}>
        <Typography type="display2">
          {textSlider.duration}
        </Typography>
      </div>
      <div className={scssClasses.textSlider}>
        <Button
          disabled={textSlider.name === 'Today'}
          onClick={() => changeTextSlider('Back')}
          classes={{ root: classes.button }}
        >
          <KeyboardArrowLeft classes={{ root: classes.svgIcon }} />
        </Button>
        <Typography type="headline">
          { textSlider.name }
        </Typography>
        <Button
          disabled={textSlider.name === 'This Month'}
          onClick={() => changeTextSlider('Next')}
          classes={{ root: classes.button }}
        >
          <KeyboardArrowRight classes={{ root: classes.svgIcon }} />
        </Button>
      </div>
    </div>
  )
}

Summary.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  textSlider: PropTypes.shape({}).isRequired,
  changeTextSlider: PropTypes.func.isRequired,
}

export default withStyles(styles)(Summary)
