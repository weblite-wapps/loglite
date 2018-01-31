// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
// css
import styles from '../../../../../../helper/style/appStyle'


function EndDatePicker(props) {
  const { isError, endDate, onEndDateChange, classes } = props
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="End Date"
        type="date"
        value={endDate}
        onChange={onEndDateChange}
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

EndDatePicker.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.bool.isRequired,
  endDate: PropTypes.string.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(EndDatePicker)
