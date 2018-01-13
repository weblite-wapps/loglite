// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  container: {
    margin: '20px 10px 20px 10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  textFieldFormLabel: {
    color: '#919191',
  },
  textFieldInkbar: {
    '&:after': {
      backgroundColor: '#919191',
    },
  },
})


function StartTimePicker(props) {
  const { isError, startTime, onStartTimeChange, classes } = props
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        label="Start time"
        type="time"
        value={startTime}
        onChange={onStartTimeChange}
        className={classes.textField}
        required
        error={isError}
        InputProps={{
            classes: {
              inkbar: classes.textFieldInkbar,
            },
            step: 60, // 1 min
          }}
        InputLabelProps={{
          className: classes.textFieldFormLabel,
          shrink: true,
          }}
      />
    </form>
  )
}

StartTimePicker.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
    textField: PropTypes.string,
    textFieldFormLabel: PropTypes.string,
    textFieldInkbar: PropTypes.string,
  }).isRequired,
  isError: PropTypes.bool.isRequired,
  startTime: PropTypes.string.isRequired,
  onStartTimeChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(StartTimePicker)
