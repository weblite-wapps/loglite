import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
// css
import { styles } from '../../../Main/Report.helper'


function StartDatePicker(props) {
  const { isError, startDate, onStartDateChange, classes } = props
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Start Date"
        type="date"
        value={startDate}
        onChange={onStartDateChange}
        className={classes.textField}
        required
        error={isError}
        InputProps={{
            classes: {
              inkbar: classes.textFieldInkbar,
            },
          }}
        InputLabelProps={{
          className: classes.textFieldFormLabel,
          shrink: true,
          }}
      />
    </form>
  )
}

StartDatePicker.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.bool.isRequired,
  startDate: PropTypes.string.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(StartDatePicker)
