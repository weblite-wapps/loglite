// modules
import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
// css
import scssClasses from './Summary.scss'
import { theme, styles } from './Summary.helper'

function Summary(props) {
  const { textSlider, changeTextSlider, classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <div className={scssClasses.container}>
        <div className={scssClasses.textSlider}>
          <Typography type="display1" classes={{ display1: classes.display1 }}>
            You worked
          </Typography>
        </div>
        <div className={scssClasses.textSlider}>
          <Typography type="display2" classes={{ display2: classes.display2 }}>
            {textSlider.duration}
          </Typography>
        </div>
        <div className={scssClasses.textSlider}>
          <Button
            disabled={textSlider.name === 'Today'}
            onClick={() => changeTextSlider('Back')}
          >
            <KeyboardArrowLeft />
          </Button>
          <Typography type="headline" classes={{ headline: classes.headline }}>
            { textSlider.name }
          </Typography>
          <Button
            disabled={textSlider.name === 'This Month'}
            onClick={() => changeTextSlider('Next')}
          >
            <KeyboardArrowRight />
          </Button>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

Summary.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  textSlider: PropTypes.shape({}).isRequired,
  changeTextSlider: PropTypes.func.isRequired,
}

export default withStyles(styles)(Summary)
