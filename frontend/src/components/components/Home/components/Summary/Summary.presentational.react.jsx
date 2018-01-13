// modules
import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
// scssClasses
import scssClasses from './Summary.scss'


const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: '#cfcfcf',
        color: 'white',
        minHeight: '40px',
        minWidth: '40px',
        padding: '0px',
        borderRadius: '0px',
        margin: '5px',
      },
    },
    MuiSvgIcon: {
      root: {
        width: '40px',
        height: '40px',
      },
    },
  },
})

const styles = {
  display1: {
    color: '#000000',
    fontWeight: '500',
  },
  display2: {
    fontWeight: '100',
    color: '#505050',
  },
  headline: {
    color: '#919191',
    textTransform: 'uppercase',
    margin: '5px',
    textAlign: 'center',
    fontSize: '27px',
    width: '165px',
  },
}

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
  classes: PropTypes.shape({
    display1: PropTypes.string.isRequired,
    display2: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
  }).isRequired,
  textSlider: PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
  changeTextSlider: PropTypes.func.isRequired,
}

export default withStyles(styles)(Summary)
