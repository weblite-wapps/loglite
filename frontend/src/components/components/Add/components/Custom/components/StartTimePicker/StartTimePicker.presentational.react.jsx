// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
// helpers
import { styles } from '../../../../Main/Add.helper'


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
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.bool.isRequired,
  startTime: PropTypes.string.isRequired,
  onStartTimeChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(StartTimePicker)
