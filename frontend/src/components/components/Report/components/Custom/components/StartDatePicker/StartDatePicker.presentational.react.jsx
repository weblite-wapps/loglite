import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  container: {
    margin: '10px',
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
  classes: PropTypes.shape({
    container: PropTypes.string,
    textField: PropTypes.string,
    textFieldFormLabel: PropTypes.string,
    textFieldInkbar: PropTypes.string,
  }).isRequired,
  isError: PropTypes.bool.isRequired,
  startDate: PropTypes.string.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(StartDatePicker)
