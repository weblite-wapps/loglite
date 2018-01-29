// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
// helpers
import { styles } from '../../../../Main/Add.helper'


function EndTimePicker(props) {
  const { isError, endTime, onEndTimeChange, classes } = props
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        label="End time"
        type="time"
        value={endTime}
        onChange={onEndTimeChange}
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

EndTimePicker.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.bool.isRequired,
  endTime: PropTypes.string.isRequired,
  onEndTimeChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(EndTimePicker)
