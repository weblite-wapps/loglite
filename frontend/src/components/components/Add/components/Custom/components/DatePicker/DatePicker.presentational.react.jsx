import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
// helpers
import { styles } from '../../../../Main/Add.helper'


function DatePicker(props) {
  const { isError, date, onDateChange, classes } = props
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Date"
        type="date"
        value={date}
        onChange={onDateChange}
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

DatePicker.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
}


export default withStyles(styles)(DatePicker)
