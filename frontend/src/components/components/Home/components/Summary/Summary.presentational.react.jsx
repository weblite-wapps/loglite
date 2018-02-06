// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
// components
import Button from '../../../../../helper/components/Button/Button.presentational.react'
// css
import scssClasses from './Summary.scss'
import styles from './Summary.style'


function Summary(props) {
  const { textSlider: { name, duration }, changeTextSlider, classes } = props
  return (
    <div className={scssClasses.container}>
      <div className={scssClasses.textSlider}>
        <Typography type="display1">
          You worked
        </Typography>
      </div>
      <div className={scssClasses.textSlider}>
        <Typography type="display2">
          {duration}
        </Typography>
      </div>
      <div className={scssClasses.textSlider}>
        <Button
          disabled={name === 'Today'}
          onClick={() => changeTextSlider('Back')}
          componentName="Summary"
        >
          <KeyboardArrowLeft classes={{ root: classes.svgIcon }} />
        </Button>
        <Typography type="headline">
          { name }
        </Typography>
        <Button
          disabled={name === 'This Month'}
          onClick={() => changeTextSlider('Next')}
          componentName="Summary"
        >
          <KeyboardArrowRight classes={{ root: classes.svgIcon }} />
        </Button>
      </div>
    </div>
  )
}

Summary.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  textSlider: PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
  changeTextSlider: PropTypes.func.isRequired,
}

export default withStyles(styles)(Summary)
